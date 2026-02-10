__nirguna_while_1: {
    {
        mov(al, [di]);
        test(al, al);
    }
    jz(__nirguna_while_end_1);
    stosb();
    jmp(__nirguna_while_1);
}
__nirguna_while_end_1: nop();
