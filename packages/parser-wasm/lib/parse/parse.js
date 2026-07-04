import {parse as wastParse} from '@webassemblyjs/wast-parser';
import {traverse} from '@webassemblyjs/ast';
import {types} from '@putout/babel';

const {
    program,
    identifier,
    functionDeclaration,
    functionExpression,
    exportNamedDeclaration,
    blockStatement,
    expressionStatement,
    callExpression,
    memberExpression,
    numericLiteral,
    stringLiteral,
    tsTypeAnnotation,
    tsTypeReference,
} = types;

export const parse = (source) => {
    const ast = wastParse(source);
    const body = [];
    
    traverse(ast, {
        Module(path) {
            for (const node of path.node.fields) {
                const built = build(node);
                
                if (built)
                    body.push(built);
            }
        },
    });
    
    return program(body);
};

function build(node) {
    if (node.type === 'Func')
        return emitFunction(node);
    
    if (node.type === 'Memory')
        return emitMemory(node);
    
    if (node.type === 'Data')
        return emitData(node);
    
    if (node.type === 'ModuleImport')
        return emitImport(node);
    
    return null;
}

function typeAnnotation(valtype) {
    return tsTypeAnnotation(tsTypeReference(identifier(valtype)));
}

function emitFunction(node) {
    const {params, results} = node.signature;
    
    const args = params.map(({id, valtype}) => {
        const param = identifier(id);
        
        param.typeAnnotation = typeAnnotation(valtype);
        
        return param;
    });
    
    const fn = functionDeclaration(
        identifier(node.name.value),
        args,
        blockStatement(node.body.map(emitStatement)),
    );
    
    if (results[0])
        fn.returnType = typeAnnotation(results[0]);
    
    return exportNamedDeclaration(fn, []);
}

function emitStatement(instr) {
    if (instr.id === 'return')
        return {
            type: 'ReturnStatement',
            argument: emitExpr(instr.args[0]),
        };
    
    return expressionStatement(emitExpr(instr));
}

function dottedCall(object, id, args) {
    return callExpression(memberExpression(identifier(object), identifier(id)), args);
}

function emitExpr(node) {
    if (node.type === 'Identifier')
        return identifier(node.value);
    
    if (node.type === 'NumberLiteral')
        return numericLiteral(node.value);
    
    if (node.object)
        return dottedCall(node.object, node.id, node.args.map(emitExpr));
    
    if (!node.args.length)
        return identifier(node.id);
    
    return callExpression(identifier(node.id), node.args.map(emitExpr));
}

function emitMemory(node) {
    return expressionStatement(callExpression(identifier('memory'), [
        numericLiteral(node.limits.min),
    ]));
}

function emitData(node) {
    const offsetValue = node.offset.args[0].value;
    const text = String.fromCharCode(...node.init.values);
    
    return expressionStatement(callExpression(identifier('data'), [
        dottedCall('i32', 'const', [
            numericLiteral(offsetValue),
        ]),
        stringLiteral(text),
    ]));
}

function emitImport({module, name, descr}) {
    const {id, signature} = descr;
    const fnName = id.value;
    const fnParams = signature.params.map((p) => identifier(p.valtype));
    const fn = functionExpression(identifier(fnName), fnParams, blockStatement([]));
    
    return expressionStatement(callExpression(identifier('__nirguna_wasm_import'), [
        stringLiteral(module),
        stringLiteral(name),
        fn,
    ]));
}

