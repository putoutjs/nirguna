export function x(): i32 {
    l: do {
        br_if(l, i32.eqz(i32.const(0)));
        i32.const(1);
    } while (true)
}