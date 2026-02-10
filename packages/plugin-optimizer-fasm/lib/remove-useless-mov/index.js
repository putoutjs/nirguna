import {types, operator} from 'putout';

const {remove} = operator;
const {isLabeledStatement} = types;

export const report = () => `Remove useless 'mov'`;

export const match = () => ({
    'mov(__a, __a)': (vars, path) => !isLabeledStatement(path.parentPath.parentPath),
    '__a: mov(__b, __b)': (vars, path) => {
        const next = path.getNextSibling();
        return Boolean(next.node);
    },
});
export const replace = () => ({
    'mov(__a, __a)': '',
    '__a: mov(__b, __b)': (vars, path) => {
        const next = path.getNextSibling();
        
        path.node.body = next.node;
        remove(next);
        
        return path;
    },
});
