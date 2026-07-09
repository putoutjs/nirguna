import {types} from '@putout/babel';

const isUndefined = (a) => typeof a === 'undefined';

const {
    identifier,
    stringLiteral,
    numericLiteral,
    nullLiteral,
    callExpression,
    expressionStatement,
} = types;

export const Table = (node) => {
    const {min, max} = node.limits;
    const maxArg = isUndefined(max) ? nullLiteral() : numericLiteral(max);
    
    return expressionStatement(callExpression(identifier('table'), [
        numericLiteral(min),
        maxArg,
        stringLiteral(node.elementType),
    ]));
};
