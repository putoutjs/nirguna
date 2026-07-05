import {types} from '@putout/babel';

const {
    identifier,
    stringLiteral,
    callExpression,
    expressionStatement,
} = types;

export const ModuleExport = (node, isAdjacent) => {
    if (isAdjacent)
        return null;
    
    return expressionStatement(callExpression(identifier('__nirguna_wasm_export'), [
        stringLiteral(node.name),
        identifier(node.descr.id.value),
    ]));
};
