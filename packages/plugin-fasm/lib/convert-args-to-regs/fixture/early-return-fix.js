import {bios} from '@nirguna/operator-fasm';

printf: {
    push(bp);
    mov(bp, sp);
    ax = [bp + 4];
    
    if (dh === 23) {
        bh = GREEN_ON_BLACK;
        bios.scroll();
        pop(bp);
        ret(2);
    }
    
    ++dh;
    line = dh;
    pop(bp);
    ret(2);
}
