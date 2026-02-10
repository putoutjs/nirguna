{
    mov(cx, cx);
    mov(si, bx);
    mov(di, kernel_name);
    repe.cmpsb();
}
