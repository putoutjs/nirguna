async function test() {
    push(bp);
    mov(bp, sp);
    mov(ax, 1);
    pop(bp);
    pop(bp);
    ret(2);
}
