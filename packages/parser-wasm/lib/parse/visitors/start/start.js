import {types} from '@putout/babel';

const {
    identifier,
    callExpression,
    expressionStatement,
} = types;

export const Start = (node) => {
    return expressionStatement(callExpression(identifier('__nirguna_wasm_start'), [
        identifier(node.index.value),
    ]));
};
