{
    mov(cx, cx);
    si = bx;
    di = kernel_name;
    repe.cmpsb();
    mov(cx, cx);
}
