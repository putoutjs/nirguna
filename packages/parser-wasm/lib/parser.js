import {parse as wastParse} from '@webassemblyjs/wast-parser';
import {traverse} from '@webassemblyjs/ast';
import {types} from '@putout/babel';
import {print as putoutPrint} from '@putout/printer';

const {
    program,
    identifier,
    functionDeclaration,
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

const ExpressionStatement = {
    print(path, {indent, print}) {
        indent();
        print('__expression');
        print.newline();
    },
};

const ReturnStatement = {
    print(path, {indent, print}) {
        indent();
        print('return');
        
        if (path.node.argument) {
            print.space();
            print('__argument');
        }
        
        print.newline();
    },
};

function print(ast) {
    return putoutPrint(ast, {
        format: {
            quote: '"',
        },
        visitors: {
            ExpressionStatement,
            ReturnStatement,
        },
    });
}

export function parse(source) {
    const ast = wastParse(source);
    const body = [];
    const raw = [];
    
    traverse(ast, {
        Module(path) {
            for (const node of path.node.fields) {
                if (node.type === 'ModuleImport') {
                    raw.push(emitImport(node));
                    continue;
                }
                
                const built = build(node);
                
                if (built)
                    body.push(built);
            }
        },
    });
    
    const printed = body.length ? print(program(body)).trimEnd() : '';
    
    return [printed, ...raw]
        .filter(Boolean)
        .join('\n\n');
}

function build(node) {
    if (node.type === 'Func')
        return emitFunction(node);
    
    if (node.type === 'Memory')
        return emitMemory(node);
    
    if (node.type === 'Data')
        return emitData(node);
    
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

function emitImport(node) {
    return `import ${node.module}.${node.name}`;
}
