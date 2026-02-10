{
    mov(cx, 0);
    mov(ax, 0x601);
    mov(dx, 0x184f);
    int(0x10);
}
ax = bios.scroll();
