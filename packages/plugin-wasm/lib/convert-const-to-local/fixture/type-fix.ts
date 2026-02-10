export async function entry(): i64 {
    {
        local(a, i64);
        local.set(a, i64.const(3));
    }
    {
        local(b, i64);
        local.set(b, i64.const(4));
    }
    
    return a + b;
}
