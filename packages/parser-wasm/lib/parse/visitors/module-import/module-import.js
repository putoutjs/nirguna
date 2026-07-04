import {types} from '@putout/babel';

const {
    stringLiteral,
    callExpression,
    expressionStatement,
    blockStatement,
    functionExpression,
    identifier,
} = types;

export const ModuleImport = ({module, name, descr}) => {
    const {id, signature} = descr;
    const fnName = id.value;
    const fnParams = signature.params.map((p) => identifier(p.valtype));
    const fn = functionExpression(identifier(fnName), fnParams, blockStatement([]));
    
    return expressionStatement(callExpression(identifier('__nirguna_wasm_import'), [
        stringLiteral(module),
        stringLiteral(name),
        fn,
    ]));
};
