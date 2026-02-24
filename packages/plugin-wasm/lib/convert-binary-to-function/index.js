import {types} from 'putout';

const {
    isFunction,
    isIdentifier,
} = types;

export const report = () => `Convert binary to function`;

export const replace = () => ({
    '__a + __b': ({__a, __b}, path) => {
        const type = parseType(path);
        
        if (isIdentifier(__a) && isIdentifier(__b))
            return `${type}.add(local.get(__a), local.get(__b))`;
        
        if (isIdentifier(__a))
            return `${type}.add(local.get(__a), __b)`;
        
        if (isIdentifier(__b))
            return `${type}.add(__a, local.get(__b))`;
        
        return `${type}.add(__a, __b)`;
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

