export function compare2(a: i32): i32 {
    if (i32.eq<i32>(i32.const(10), local.get(a)))
        i32.const(5);
    else
        i32.const(10);
}
