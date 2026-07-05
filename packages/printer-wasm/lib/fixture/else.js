export function compare2(a: i32): i32 {
    if (i32.eq(i32.const(10), local.get(a)))
        return i32.const(5);
    else
        return i32.const(10);
}
