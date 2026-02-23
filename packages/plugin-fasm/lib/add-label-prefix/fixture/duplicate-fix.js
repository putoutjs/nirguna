format.ELF64.executable;
nentry.$;
__nirguna_add: {
    push(rbp);
    mov(rbp, rsp);
    mov(rax, [rbp + 16]);
    add(rax, [rbp + 24]);
    pop(rbp);
    ret(16);
    ret(16);
}
