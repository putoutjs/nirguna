export function x(a: i32) {
    if (i32.eqz(local.get(a))) {
        return i32.const(1);
    }
}