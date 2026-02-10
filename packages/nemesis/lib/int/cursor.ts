import {io} from '@nirguna/operator-fasm';
import {getLine, setLine} from './position/line.ts';
import {getColumn, setColumn} from './position/column.ts';

export async function getCursor() {
    al = await getColumn();
    ah = await getLine();
    
    return ax;
}

export async function setCursor<es, dx>() {
    // bx = offset
    ax = 0xb800;
    es = ax;
    // в bl;столбик
    await setColumn();
    // в bh;рядок
    await setLine();
    al = await getLine();
    ah = 0;
    bh = 0;
    
    dx = 80;
    // calculate y offset
    mul(dx);
    bx += ax;
    // select to write low byte of index
    al = 0xf;
    dx = 0x03d4;
    io.out(dx, al);
    // write it
    al = bl;
    dx = 0x03d5;
    io.out(dx, al);
    // select to write high byte of index
    al = 0xe;
    dx = 0x03d4;
    io.out(dx, al);
    // write it
    al = bh;
    dx = 0x03d5;
    io.out(dx, al);
    
    dx = 0;
    dl = await getLine();
    imul(dx, 80 * 2);
    di = dx;
    al = await getColumn();
    ah = 0;
    imul(ax, 2);
    di += ax;
    
    return di;
}
