import {types} from 'putout';

const {
    isProgram,
    isArrayExpression,
    isIdentifier,
} = types;

export const report = () => `Use 'equ' instead of 'const'`;

export const match = () => ({
    'const __a = __b': ({__b}, path) => {
        if (isArrayExpression(__b)) {
            const [first] = __b.elements;
            return !isIdentifier(first);
        }
        
        return isProgram(path.parentPath);
    },
});

export const replace = () => ({
    'const __a = __b': '__a.equ = __b;',
});
