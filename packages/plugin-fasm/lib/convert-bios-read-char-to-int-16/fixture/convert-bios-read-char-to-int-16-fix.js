import {bios} from '@nirguna/operator-fasm';

{
    ax = 0;
    int(0x16);
}
{
    ax = 0;
    int(0x16);
}
bx = bios.readChar();
