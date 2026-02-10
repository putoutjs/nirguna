async function write<es, ax, di>() {
    mov(ax, 3);
    int(0xff);
    
    return ax;
}
