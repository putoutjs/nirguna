async function sum() {
    push(bp);
    mov(bp, sp);
    {
        ax = [
            bp + 4,
        ];
        ax += [
            bp + 6,
        ];
    }
    pop(bp);
    ret(4);
}
