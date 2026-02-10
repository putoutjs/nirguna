export const compare = (eax) => {
    {
        cmp(eax, 0);
        jnz(__nirguna_fasm_if_end_1);
        {
            mov(ax, 1);
            ret();
        }
    }
    __nirguna_fasm_if_end_1: mov(ax, 0);
    ret();
};

export const compare2 = (eax) => {
    {
        cmp(eax, 0);
        jz(__nirguna_fasm_if_end_2);
        {
            mov(ax, 1);
            ret();
        }
    }
    __nirguna_fasm_if_end_2: mov(ax, 0);
    ret();
};
