import {bios} from '@nirguna/operator-fasm';

{
    ah = 2;
    int(0x13);
    jnc(__nirguna_read_sector_ok_3);
    al = 1;
    jmp(__nirguna_read_sector_end_3);
    __nirguna_read_sector_ok_3: ax = 0;
    __nirguna_read_sector_end_3: clc();
}
