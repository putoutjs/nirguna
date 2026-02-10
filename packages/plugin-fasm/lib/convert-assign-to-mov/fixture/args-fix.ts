async function get() {
    push(bp);
    mov(bp, sp);
    mov([bp + 6], [bp + 4]);
    pop(bp);
}
