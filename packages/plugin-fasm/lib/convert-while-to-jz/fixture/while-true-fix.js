__nirguna_while_1: {
    cmp(al, al);
    je(__nirguna_while_end_1);
    lodsb();
    jmp(__nirguna_while_1);
}
__nirguna_while_end_1: nop();
