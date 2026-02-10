import {types} from 'putout';

const {isIdentifier} = types;

export const report = () => `Use 'test' instead 'cmp'`;

export const match = () => ({
    'cmp(__a, 0)': ({__a}) => isIdentifier(__a),
});

export const replace = () => ({
    'cmp(__a, 0)': 'test(__a, __a)',
});
