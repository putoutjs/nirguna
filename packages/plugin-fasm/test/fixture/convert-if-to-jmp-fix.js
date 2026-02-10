__nirguna_compare: {
    {
        cmp(eax, ebx);
        jnz(__nirguna_fasm_if_end_1);
        {
            mov(ax, 5);
            ret();
        }
    }
    __nirguna_fasm_if_end_1: mov(ax, 3);
    ret();
    ret();
}
