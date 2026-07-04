import {types} from '@putout/babel';
import {ModuleImport} from './module-import/module-import.js';

const {
    stringLiteral,
    numericLiteral,
    memberExpression,
    callExpression,
    expressionStatement,
    exportNamedDeclaration,
    blockStatement,
    functionDeclaration,
    identifier,
    tsTypeAnnotation,
    tsTypeReference,
} = types;

export const visitors = {
    Func: emitFunction,
    Memory: emitMemory,
    Data: emitData,
    ModuleImport,
};

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

function typeAnnotation(valtype) {
    return tsTypeAnnotation(tsTypeReference(identifier(valtype)));
}
