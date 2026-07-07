const c: i32 = i32.const(42);

export function x(): i32 {
    global.get(c);
}
