export function compare(eax: i32): i32 {
    if (i32.eq(local.get(eax), i32.const(10)))
        return i32.const(5);
    else
        return i32.const(10);
}

export function compare2(eax: i32): i32 {
    if (i32.eq<x>(local.get(eax), i32.const(10)))
        return i32.const(5);
    else
        return i32.const(10);
}