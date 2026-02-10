function getStringLength(str) {
    mov(si, str);
    mov(cx, 0);
    mov(al, 1);
    
    __nirguna_while_8: test(al, al);
    jz(__nirguna_while_end_8);
    lodsb();
    inc(cx);
    jmp(__nirguna_while_8);
    __nirguna_while_end_8: mov(ax, cx);
    ret();
}
