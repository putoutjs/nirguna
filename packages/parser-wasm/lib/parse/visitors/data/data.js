import {types} from '@putout/babel';
import {dottedCall} from '../../utils.js';

const {
    identifier,
    callExpression,
    expressionStatement,
    numericLiteral,
    stringLiteral,
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
