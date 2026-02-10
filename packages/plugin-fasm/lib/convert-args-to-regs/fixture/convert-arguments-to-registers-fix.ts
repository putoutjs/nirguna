async function setColumn() {
    push(bp);
    mov(bp, sp);
    col = [bp + 4];
    pop(bp);
}

async function setLine() {
    push(bp);
    mov(bp, sp);
    line = [bp + 4];
    pop(bp);
}

async function get() {
    return 5;
}
