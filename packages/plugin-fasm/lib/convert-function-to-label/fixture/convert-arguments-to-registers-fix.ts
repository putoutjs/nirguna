setColumn: {
    push(bp);
    mov(bp, sp);
    [col] = [bp + 4];
    pop(bp);
    ret(2);
}
