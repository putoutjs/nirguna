import {operator} from 'putout';

const {compare, remove} = operator;
const RET = 'ret()';

export const report = () => `Avoid useless 'ret'`;

export const match = () => ({
    'ret(__a)': ({__a}, path) => {
        const next = path.parentPath.getNextSibling();
        return compare(next, `ret(${__a.value})`);
    },
    '__a: ret()': (vars, path) => {
        const next = path.getNextSibling();
        return compare(next, 'ret(__a)');
    },
    [RET]: (vars, path) => {
        const next = path.parentPath.getNextSibling();
        const prev = path.parentPath.getPrevSibling();
        
        if (compare(next, 'iret()'))
            return true;
        
        if (compare(next, 'ret(__a)'))
            return true;
        
        if (compare(prev, 'iret()'))
            return true;
        
        if (compare(prev, 'jmp(__a)'))
            return true;
        
        if (compare(prev, 'jmp.far(__a)'))
            return true;
        
        if (compare(prev, '__a: jmp(__b)'))
            return true;
        
        return compare(next, RET);
    },
});

export const replace = () => ({
    [RET]: '',
    'ret(__a)': '',
    '__a: ret()': (vars, path) => {
        const next = path.getNextSibling();
        
        path.node.body = next.node;
        remove(next);
        
        return path;
    },
});
