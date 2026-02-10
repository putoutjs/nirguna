{
    ah = 1;
    bx = 31744;
    cl = 2;
    ch = 0;
    dl = 0;
    dh = 1;
    {
        al = 12;
        int(0x0ff);
        jnc(__nirguna_read_sector_ok_1);
        al = 1;
        jmp(__nirguna_read_sector_end_1);
        __nirguna_read_sector_ok_1: ax = 0;
        __nirguna_read_sector_end_1: clc();
    }
    mov(al, al);
}
