import {operator} from 'putout';

const {remove, compare} = operator;

export const report = () => `Avoid useless 'or/jnz'`;

export const match = () => ({
    '__a: __b': ({__a}, path) => {
        const prev = path.getPrevSibling();
        
        if (!prev.node)
            return false;
        
        if (!compare(prev, `jnz(${__a.name})`))
            return false;
        
        const prevPrev = prev.getPrevSibling();
        
        return compare(prevPrev, 'or(__a, __a)');
    },
});

export const replace = () => ({
    '__a: __b': (vars, path) => {
        const prev = path.getPrevSibling();
        const prevPrev = prev.getPrevSibling();
        
        remove(prev);
        remove(prevPrev);
        
        return '__b';
    },
});
