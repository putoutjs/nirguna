import {io} from '@nirguna/operator-fasm';

__nirguna_do_while_3: {
    io.in(al, 0x60);
    cmp(al, 250);
    jz(__nirguna_do_while_3);
}
