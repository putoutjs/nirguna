import {create} from '#operator-wasm';

export const stack = [];

export const imports = [
    ['console', 'log', function log(i32) {
        return i32;
    }],
];

const {
    i32,
    local,
    call,
} = create({
    stack,
    imports,
});

export function entry(a: i32, b: i32): i32 {
    i32.add(local.get(a), local.get(b));
    call('log');
}
