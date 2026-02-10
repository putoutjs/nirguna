import {types, operator} from 'putout';

const {
    remove,
    replaceWith,
    compare,
} = operator;

const {isLabeledStatement} = types;

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const match = () => ({
    '__a: __b': (vars, path) => {
        const next = path.getNextSibling();
        
        if (!isLabeledStatement(next))
            return false;
        
        return compare(path.node.body, next.node.body);
    },
});

export const replace = () => ({
    '__a: __b': (vars, path) => {
        const next = path.getNextSibling();
        const {node} = path;
        
        next.node.body = node;
        replaceWith(path, next.node);
        remove(next);
        
        return path;
    },
});
