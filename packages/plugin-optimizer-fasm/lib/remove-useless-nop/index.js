import {operator, types} from 'putout';

const {labeledStatement} = types;
const {remove} = operator;

export const report = () => `Remove useless 'nop'`;

export const match = () => ({
    '__a: nop()': (vars, path) => {
        const next = path.getNextSibling();
        return next.node;
    },
});

export const replace = () => ({
    '__a: nop()': ({__a}, path) => {
        const next = path.getNextSibling();
        const {node} = next;
        
        remove(next);
        
        return labeledStatement(__a, node);
    },
});
