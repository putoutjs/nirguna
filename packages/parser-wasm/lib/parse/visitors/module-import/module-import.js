import {types} from '@putout/babel';
import {typeAnnotation} from '../func/func.js';

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
    
    const fnParams = signature.params.map(({id: paramId, valtype}) => {
        const param = identifier(paramId || valtype);
        
        if (paramId)
            param.typeAnnotation = typeAnnotation(valtype);
        
        return param;
    });
    
    const fn = functionExpression(identifier(fnName), fnParams, blockStatement([]));
    
    if (signature.results[0])
        fn.returnType = typeAnnotation(signature.results[0]);
    
    return expressionStatement(callExpression(identifier('__nirguna_wasm_import'), [
        stringLiteral(module),
        stringLiteral(name),
        fn,
    ]));
};
