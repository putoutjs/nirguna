import {bios} from '@nirguna/operator-fasm';

async function printf(string) {
    ax = string;
    
    if (dh === 23) {
        bh = GREEN_ON_BLACK;
        bios.scroll();
        
        return;
    }
    
    ++dh;
    line = dh;
}
