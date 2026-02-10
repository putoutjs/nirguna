function add(): i32 {
    {
        local(eax, i32);
        local.set(eax, i32.const(1));
    }
    {
        local(ebx, i32);
        local.set(ebx, i32.const(2));
    }
    i32.add(local.get(), local.get());
}

export const fn = () => {};
