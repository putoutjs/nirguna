export function clearBuffer(buffer): [] {
    local(i, i32);
    b: {
        l: do {
            br_if(b, i32.eqz(i32.load8_u(i32.add(local.get(buffer), local.get(i)))));
            i32.store8(i32.add(local.get(buffer), local.get(i)), i32.const(0));
            local.set(i, i32.add(local.get(i), i32.const(1)));
            br(l);
        } while (true);
    }
}
