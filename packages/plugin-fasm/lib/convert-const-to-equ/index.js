import {types} from 'putout';

const {isProgram} = types;

export const report = () => `Use 'equ' instead of 'const'`;

export const match = () => ({
    'const __a = __b': (vars, path) => {
        return isProgram(path.parentPath);
    },
});

export const replace = () => ({
    'const __a = __b': '__a.equ = __b;',
});
