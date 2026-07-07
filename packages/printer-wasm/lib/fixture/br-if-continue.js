export function x(): i32 {
    l: while (true) {
        if (i32.eqz(i32.const(0))) {
            continue l;
        }
        i32.const(1);
    }
}
