import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    expressionStatement,
    numericLiteral,
    stringLiteral,
    memberExpression,
} = types;

export const Data = (node) => {
    const offsetValue = node.offset.args[0].value;
    const text = String.fromCharCode(...node.init.values);
    
    return expressionStatement(callExpression(identifier('data'), [
        dottedCall('i32', 'const', [
            numericLiteral(offsetValue),
        ]),
        stringLiteral(text),
    ]));
};

const dottedCall = (object, id, args) => {
    return callExpression(memberExpression(identifier(object), identifier(id)), args);
};

