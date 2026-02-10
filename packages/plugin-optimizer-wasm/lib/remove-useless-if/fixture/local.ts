export function compare2(eax: i32): i32 {
    if (i32.eq(local.get(eax), i32.const(0)))
        return i32.const(1);

    return i32.const(0);
}
