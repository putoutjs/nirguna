getStringLength: {
    push(bp);
    mov(bp, sp);
    si = [bp + 4];
    cx = -1;
    cld();
    
    do {
        lodsb();
        ++cx;
    } while (al);
    ax = cx;
    pop(bp);
    ret(2);
    ret(2);
}
