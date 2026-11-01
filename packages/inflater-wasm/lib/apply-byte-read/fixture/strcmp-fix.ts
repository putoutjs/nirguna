export function strcmp(a, b) {
    local(i, i32);
    b: {
        l: do {
            br_if(b, i32.eqz(i32.load8_u(i32.add(local.get(a), local.get(i)))));
            br_if(b, i32.ne(i32.load8_u(i32.add(local.get(a), local.get(i))), i32.load8_u(i32.add(local.get(b), local.get(i)))));
            local.set(i, i32.add(local.get(i), i32.const(1)));
            br(l);
        } while (true);
    }
    i32.and(i32.ne(i32.load8_u(i32.add(local.get(a), local.get(i))), i32.load8_u(i32.add(local.get(b), local.get(i)))), i32.ne(i32.load8_u(i32.add(local.get(a), local.get(i))), i32.const(0)));
}
