import {types} from '@putout/babel';

const {
    identifier,
    stringLiteral,
    callExpression,
    expressionStatement,
} = types;

export const ModuleExport = (node, {exportMap}) => {
    const info = exportMap.get(node.descr.id.value);
    
    if (info?.merge)
        return null;
    
    return expressionStatement(callExpression(identifier('__nirguna_wasm_export'), [
        stringLiteral(node.name),
        identifier(node.descr.id.value),
    ]));
};
