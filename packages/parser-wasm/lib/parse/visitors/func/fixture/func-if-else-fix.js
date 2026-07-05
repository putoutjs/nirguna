export function x(a: i32): i32 {
    if (i32.eqz(local.get(a))) {
        i32.const(1);
    } else {
        i32.const(0);
    }
}