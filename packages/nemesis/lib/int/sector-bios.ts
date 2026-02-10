import {bios} from '@nirguna/operator-fasm';

export async function readSector() {
    ax = bios.readSector({
        count: ah,
        buffer: bx,
        sector: cl,
        track: ch,
        head: dh,
        disk: dl,
    });
    
    return ax;
}
