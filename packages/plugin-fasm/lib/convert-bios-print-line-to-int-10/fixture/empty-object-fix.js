import {bios} from '@nirguna/operator-fasm';

{
    push(bp);
    bh = 0;
    bl = 0;
    cx = 0;
    dh = 0;
    dl = 0;
    bp = str;
    ax = 0x1301;
    int(0x10);
    pop(bp);
}
