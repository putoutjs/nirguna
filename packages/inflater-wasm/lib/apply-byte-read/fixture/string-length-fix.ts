export function getStringLength(str) {
    local(n, i32);
    b: {
        l: do {
            br_if(b, i32.eqz(i32.load8_u(i32.add(local.get(str), local.get(n)))));
            local.set(n, i32.add(local.get(n), i32.const(1)));
            br(l);
        } while (true);
    }
    local.get(n);
}
