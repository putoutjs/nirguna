__nirguna_write: {
    push(es);
    push(ax);
    push(di);
    mov(cl, 1);
    mov(ch, 2);
    call(__nirguna_clear);
    pop(di);
    pop(ax);
    pop(es);
    ret();
}
__nirguna_clear: {
    push(es);
    push(ax);
    push(di);
    pop(di);
    pop(ax);
    pop(es);
    ret();
}
