import {types} from '@putout/babel';
import {typeAnnotation, emitStatement} from '../../utils.js';

const {
    identifier,
    functionDeclaration,
    exportNamedDeclaration,
    blockStatement,
} = types;

export const Func = (node) => {
    const {params, results} = node.signature;
    
    const args = params.map(({id, valtype}) => {
        const param = identifier(id);
        
        param.typeAnnotation = typeAnnotation(valtype);
        
        return param;
    });
    
    const fn = functionDeclaration(
        identifier(node.name.value),
        args,
        blockStatement(node.body.map(emitStatement)),
    );
    
    if (results[0])
        fn.returnType = typeAnnotation(results[0]);
    
    return exportNamedDeclaration(fn, []);
};
