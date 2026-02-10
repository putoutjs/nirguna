import {types} from 'putout';
import {isRegister} from '@nirguna/operator-fasm/regs';

const {isArrayExpression} = types;

export const report = () => `Switch 'cmp' operands`;

export const match = () => ({
    'cmp(__a, __b)': ({__a}) => {
        if (isArrayExpression(__a))
            return false;
        
        return !isRegister(__a.name);
    },
});

export const replace = () => ({
    'cmp(__a, __b)': 'cmp(__b, __a)',
});
