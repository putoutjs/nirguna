export function x(a: i32): i32 {
    b: {
        l:         do {
            br_if(b, i32.eqz(local.get(a)));
            br(l);
        } while (true);
        i32.const(1);
    }
}