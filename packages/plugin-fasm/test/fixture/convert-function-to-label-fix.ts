__nirguna_write: {
    push(es);
    push(ax);
    push(di);
    mov(ax, 3);
    int(0xff);
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
    iret();
}
