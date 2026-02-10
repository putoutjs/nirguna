write: {
    push([es, ax, di]);
    mov(ax, 3);
    int(0xff);
    pop([di, ax, es]);
    {
        ax = ax;
        ret();
    }
    ret();
}
