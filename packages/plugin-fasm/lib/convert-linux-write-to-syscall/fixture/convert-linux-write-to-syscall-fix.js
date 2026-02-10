{
    rdi = 1;
    rsi = message;
    rdx = length;
    rax = 1;
    syscall();
}
