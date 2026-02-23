import {types} from 'putout';

const {
    identifier,
    tsTypeReference,
    tsTypeAnnotation,
    isFunction,
} = types;

const createType = () => tsTypeAnnotation(tsTypeReference(identifier('i32')));

export const report = () => `Apply types`;

export const match = () => ({
    'function __a(__args) {__body}': (vars, path) => !path.node.returnType,
});

export const replace = () => ({
    '__a + __b': (vars, path) => {
        const type = parseType(path);
        return `${type}.add(local.get(__a), local.get(__b))`;
    },
    'function __a(__args) {__body}': (vars, path) => {
        for (const param of path.get('params')) {
            const typeAnnotation = createType();
            param.node.typeAnnotation = typeAnnotation;
        }
        
        const {returnType} = path.node;
        
        if (!returnType)
            path.node.returnType = createType();
        
        return path;
    },
});

function parseType(path) {
    const fnPath = path.find(isFunction);
    
    if (!fnPath)
        return 'i32';
    
    const {returnType} = fnPath.node;
    
    if (!returnType)
        return 'i32';
    
    return returnType.typeAnnotation.typeName.name;
}
