import {types} from 'putout';

const {
    isFunction,
    isExportDeclaration,
} = types;

export const report = () => `Use 'local' instead of 'const'`;

export const match = () => ({
    'const __a = __b': (vars, path) => {
        if (isExportDeclaration(path.parentPath))
            return false;
        
        return isFunction(path.scope.block);
    },
});
export const replace = () => ({
    'const __a = __b': ({__a}) => {
        const type = parseType(__a);
        delete __a.typeAnnotation;
        
        return `{
            local(__a, ${type})
            local.set(__a, ${type}.const(__b))
        }`;
    },
});

function parseType({typeAnnotation}) {
    if (!typeAnnotation)
        return 'i32';
    
    return typeAnnotation.typeAnnotation.typeName.name;
}
