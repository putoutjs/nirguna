{
    mov(ah, 2);
    int(0x13);
    jnc(__nirguna_read_sector_ok_3);
    mov(al, 1);
    jmp(__nirguna_read_sector_end_3);
    __nirguna_read_sector_ok_3: mov(ax, 0);
    __nirguna_read_sector_end_3: clc();
}
