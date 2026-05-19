{
    al = 1;
    bx = 0;
    cl = 0;
    ch = 0;
    dl = 0;
    dh = 0;
    {
        ah = 2;
        int(0x13);
        jnc(__nirguna_read_sector_ok_1);
        al = 1;
        jmp(__nirguna_read_sector_end_1);
        __nirguna_read_sector_ok_1: ax = 0;
        __nirguna_read_sector_end_1: clc();
    }
    mov(ax, ax);
}
