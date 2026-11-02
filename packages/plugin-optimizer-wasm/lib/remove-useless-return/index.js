import {types} from 'putout';

const {isIfStatement, isFunction} = types;

export const report = () => `Avoid useless 'return'`;

export const match = () => ({
    'return __a': (vars, path) => {
        if (isFunction(path.parentPath.parentPath))
            return true;
        
        const {parentPath} = path;
        
        if (!isIfStatement(parentPath))
            return false;
        
        return Boolean(parentPath.node.test.typeArguments);
    },
});

export const replace = () => ({
    'return __a': '__a',
});
