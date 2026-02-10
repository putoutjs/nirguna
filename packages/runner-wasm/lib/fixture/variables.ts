import {create} from '#operator-wasm';

export const stack = [];

const {
    i32,
    local,
    call,
} = create({
    stack,
});

export function entry(a: i32, b: i32): i32 {
    i32.add(local.get(a), local.get(b));
}
