{
    cmp(al, FIRST);
    jg(__nirguna_fasm_if_or_1);
    cmp(al, LAST);
    jge(__nirguna_fasm_if_end_1);
    __nirguna_fasm_if_or_1: {
        ret();
    }
}
__nirguna_fasm_if_end_1: nop();
