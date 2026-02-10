import {operator} from 'putout';

const ALLOWED_INSTRUCTIONS = [
    'mov',
    'ret',
    'loop',
    'xor',
    'cmp',
];

const {compare} = operator;

const check = ({__a}, path) => {
    if (!ALLOWED_INSTRUCTIONS.includes(__a.name))
        return false;
    
    const next = path.parentPath.getNextSibling();
    
    return compare(path, next);
};

export const match = () => ({
    '__a(__b, __c)': check,
    '__a(__b)': check,
});

export const report = () => `Avoid duplicate operations`;

export const replace = () => ({
    '__a(__b, __c)': '',
    '__a(__b)': '',
});
