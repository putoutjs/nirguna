import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    expressionStatement,
    numericLiteral,
} = types;

export const Memory = (node) => {
    return expressionStatement(callExpression(identifier('memory'), [
        numericLiteral(node.limits.min),
    ]));
};
