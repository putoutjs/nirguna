import {bios} from '@nirguna/operator-fasm';

{
    cx = 0;
    ax = 0x601;
    dx = 0x184f;
    int(0x10);
}
ax = bios.scroll();
