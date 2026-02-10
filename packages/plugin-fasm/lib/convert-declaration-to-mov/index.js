import {types} from 'putout';
import {isRegister} from '@nirguna/operator-fasm/regs';

const {isExportDeclaration} = types;

export const report = () => `Use 'mov' instead of 'const'`;

export const match = () => ({
    'const __a = __b': ({__a}, path) => {
        if (!isRegister(__a.name))
            return false;
        
        return !isExportDeclaration(path.parentPath);
    },
    'let __a = __b': ({__a}) => {
        return isRegister(__a.name);
    },
});

export const replace = () => ({
    'const __a = __b': 'mov(__a, __b)',
    'let __a = __b': 'mov(__a, __b)',
});
