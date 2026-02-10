import {template, operator} from 'putout';

const {replaceWith} = operator;

const createCall = template(`i32.const(VALUE)`);

export const report = () => `Use 'i32.const()'`;

export const include = () => [
    'NumericLiteral',
];

export const exclude = () => [
    '__.const(__a)',
    '__nirguna_wasm_memory(__args)',
];

export const fix = (path) => {
    replaceWith(path, createCall({
        VALUE: path.node,
    }));
};
