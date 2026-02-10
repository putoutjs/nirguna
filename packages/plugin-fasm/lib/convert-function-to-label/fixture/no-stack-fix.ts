write: {
    mov(ax, 3);
    int(0xff);
    ret();
}
clear: {
    iret();
}
