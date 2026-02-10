export const compare = (a) => {
    if (i32.eq(local.get(a), i32.const(10)))
        return i32.const(1);
    
    return i32.const(0);
};
