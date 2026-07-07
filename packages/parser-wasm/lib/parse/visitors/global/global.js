import {types} from '@putout/babel';
import {typeAnnotation, emitExpression} from '../func/func.js';

const {
    identifier,
    variableDeclaration,
    variableDeclarator,
} = types;

export const Global = (node) => {
    const {valtype, mutability} = node.globalType;
    const id = identifier(node.name.value);
    
    id.typeAnnotation = typeAnnotation(valtype);
    
    const kind = mutability === 'var' ? 'let' : 'const';
    const [init] = node.init;
    
    return variableDeclaration(kind, [
        variableDeclarator(id, emitExpression(init)),
    ]);
};
