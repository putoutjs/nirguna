function add(): i32 {
    local(eax, i32);
    local(ebx, i32);
    local.set(eax, i32.const(1));
    local.set(ebx, i32.const(2));
    
    i32.add(local.get(eax), local.get(ebx));
}

export function compare(a: i32): i32 {
    if (i32.eq(a, 10))
        i32.const(1);
    
    i32.const(0);
}

export function thenElse(a: i32): i32 {
    if (i32.eq(a, 10))
        return i32.const(1);
    else
        return i32.const(5);
}
