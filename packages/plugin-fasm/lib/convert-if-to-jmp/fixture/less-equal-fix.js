{
    cmp(al, FIRST);
    jl(__nirguna_fasm_if_end_1);
    cmp(al, LAST);
    jg(__nirguna_fasm_if_end_1);
    {
        ret();
    }
}
__nirguna_fasm_if_end_1: nop();
