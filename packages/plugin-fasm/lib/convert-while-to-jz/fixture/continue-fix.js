__nirguna_while_1: {
    __nirguna_while_condition_1: {
        mov(al, [esi]);
        test(al, al);
    }
    jz(__nirguna_while_end_1);
    
    if (al === 0)
        (jmp(__nirguna_while_condition_1));
    
    ++esi;
    jmp(__nirguna_while_1);
}
__nirguna_while_end_1: nop();
