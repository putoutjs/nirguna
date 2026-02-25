export const compare = (a: i32): i32 => {
    if (i32.eq(local.get(a), i32.const(10)))
        return i32.const(1);
    
    if (i32.eq(local.get(a), i32.const(20)))
        return i32.const(2);
    
    return i32.const(0);
};

export const compare2 = (a: i32): i32 => {
    if (i32.eq(i32.const(10), local.get(a)))
        return i32.const(1);
    
    return i32.const(0);
};
