import {types} from '@putout/babel';
import {typeAnnotation, emitExpression} from '../func/func.js';

const {
    identifier,
    variableDeclaration,
    variableDeclarator,
    exportNamedDeclaration,
} = types;

export const Global = (node, {exportMap}) => {
    const {valtype, mutability} = node.globalType;
    const id = identifier(node.name.value);
    
    id.typeAnnotation = typeAnnotation(valtype);
    
    const kind = mutability === 'var' ? 'let' : 'const';
    const [init] = node.init;
    
    const decl = variableDeclaration(kind, [
        variableDeclarator(id, emitExpression(init)),
    ]);
    
    const info = exportMap.get(node.name.value);
    
    if (info?.merge)
        return exportNamedDeclaration(decl, []);
    
    return decl;
};
