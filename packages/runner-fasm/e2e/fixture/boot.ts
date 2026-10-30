import {org, use16} from '@nirguna/operator-fasm';

org(0x7C00);
use16();

const DEBUG_PORT = 0xE9;
let msg = ['Hello World'];

function start() {
    cli();
    ax = 0;
    ds = ax;
    si = msg;
    
    lodsb();
    
    while (al) {
        io.out(DEBUG_PORT, al);
        lodsb();
    }
    
    hlt();
}

section: 'data';

(rb, 0x200 - ($ - start) - 2);
(dw, 0xAA55);