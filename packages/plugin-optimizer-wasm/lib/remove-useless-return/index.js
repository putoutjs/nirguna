import {types} from 'putout';

const {isIfStatement, isFunction} = types;

export const report = () => `Avoid useless 'return'`;

export const match = () => ({
    'return __a': (vars, path) => {
        if (isFunction(path.parentPath.parentPath))
            return true;
        
        const {parentPath} = path;
        const next = parentPath.getNextSibling();
        
        if (!isIfStatement(parentPath))
            return false;
        
        const {typeArguments} = parentPath.node.test;
        
        return typeArguments || next.node;
    },
});

export const replace = () => ({
    'return __a': '__a',
});
