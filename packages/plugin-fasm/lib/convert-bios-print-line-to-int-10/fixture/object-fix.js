import {bios} from '@nirguna/operator-fasm';

const str = 'hello';

{
    push(bp);
    bh = 0;
    bl = 2;
    cx = 0;
    dh = [line];
    dl = 0;
    bp = str;
    ax = 0x1301;
    int(0x10);
    pop(bp);
}
