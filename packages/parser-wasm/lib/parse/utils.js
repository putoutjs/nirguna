import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    memberExpression,
    numericLiteral,
    expressionStatement,
    tsTypeAnnotation,
    tsTypeReference,
} = types;

export const dottedCall = (object, id, args) => {
    return callExpression(memberExpression(identifier(object), identifier(id)), args);
};

export const emitExpr = (node) => {
    if (node.type === 'Identifier')
        return identifier(node.value);
    
    if (node.type === 'NumberLiteral')
        return numericLiteral(node.value);
    
    if (node.object)
        return dottedCall(node.object, node.id, node.args.map(emitExpr));
    
    if (!node.args.length)
        return identifier(node.id);
    
    return callExpression(identifier(node.id), node.args.map(emitExpr));
};

export const emitStatement = (instr) => {
    if (instr.id === 'return')
        return {
            type: 'ReturnStatement',
            argument: emitExpr(instr.args[0]),
        };
    
    return expressionStatement(emitExpr(instr));
};

export const typeAnnotation = (valtype) => {
    return tsTypeAnnotation(tsTypeReference(identifier(valtype)));
};
