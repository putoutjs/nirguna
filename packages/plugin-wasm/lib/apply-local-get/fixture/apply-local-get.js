
export const compare = (a) => {
    if (i32.eq(a, 10))
        return 1;
    
    if (i32.eq(local.get(a), 20))
        return 2;
    
    return 0;
};

export const compare2 = (a) => {
    if (i32.eq(10, a))
        return 1;
    
    return 0;
};