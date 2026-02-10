async function get() {
    push(ebp);
    mov(ebp, esp);
    mov(eax, [ebp + 8]);
    pop(ebp);
    ret(4);
}
