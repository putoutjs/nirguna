import {types} from 'putout';

const {isNumericLiteral} = types;

export const report = () => `Apply data address type`;

export const match = () => ({
    'data(__a, __b)': ({__a}) => isNumericLiteral(__a),
});

export const replace = () => ({
    'data(__a, __b)': 'data(i32.const(__a), __b)',
});
