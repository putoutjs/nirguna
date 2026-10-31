import {io} from '@nirguna/operator-fasm';

__nirguna_do_while_3: {
    io.in(al, 0x60);
    cmp(al, 0xfa);
    jz(__nirguna_do_while_3);
}
