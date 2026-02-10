import {operator} from 'putout';

const {compare} = operator;

export const report = () => `Avoid useless 'jmp'`;

export const match = () => ({
    'jmp(__a)': ({__a}, path) => {
        const next = path.parentPath.getNextSibling();
        return compare(next, `${__a.name}: __b`);
    },
});

export const replace = () => ({
    'jmp(__a)': '',
});
