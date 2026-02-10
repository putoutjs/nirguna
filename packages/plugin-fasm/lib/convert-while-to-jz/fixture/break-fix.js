__nirguna_while_1: {
    {
        mov(al, [esi]);
        test(al, al);
    }
    jz(__nirguna_while_end_1);
    
    if (al === 0)
        (jmp(__nirguna_while_end_1));
    
    ++esi;
    ++ecx;
    jmp(__nirguna_while_1);
}
__nirguna_while_end_1: __nirguna_while_9: {
    {
        lodsb();
        test(al, al);
    }
    jz(__nirguna_while_end_9);
    
    if (al !== [udi])
        (jmp(__nirguna_while_end_9));
    
    ++udi;
    ++ucx;
    jmp(__nirguna_while_9);
}
__nirguna_while_end_9: nop();
