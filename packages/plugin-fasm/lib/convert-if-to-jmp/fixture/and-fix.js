{
    cmp(al, FIRST);
    jle(__nirguna_fasm_if_end_1);
    cmp(al, LAST);
    jge(__nirguna_fasm_if_end_1);
    {
        ret();
    }
}
__nirguna_fasm_if_end_1: nop();
