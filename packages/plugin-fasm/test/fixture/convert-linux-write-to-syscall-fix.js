{
    mov(rdi, 1);
    mov(rsi, message);
    mov(rdx, length);
    mov(rax, 1);
    syscall();
}
