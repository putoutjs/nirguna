export function x(): i32 {
    b: {
        i32.const(1);
        break b;
    }
    i32.const(0);
}
