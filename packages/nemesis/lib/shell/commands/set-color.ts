import {nemesis} from '@nirguna/operator-nemesis';
import {i8} from '@nirguna/operator-fasm';

let colorHelp = [
    'type: color bt',
    0xd,
    `where b - it's bgcolor and `,
    't - text color',
    0xd,
    'one of:',
    0xd,
    '0 = black     8 = gray',
    0xd,
    '1 = dark blue 9 = light blue',
    0xd,
    '2 = green     a = light green',
    0xd,
    '3 = blue      b = light blue',
    0xd,
    '4 = red       c = light red',
    0xd,
    '5 = violet    d = light violet',
    0xd,
    '6 = yellow    d = light yellow',
    0xd,
    '7 = white     f = light white',
    0xd,
];

// в cl тextcolor, в ch bgcolor
export async function setColor() {
    si = di;
    ++si;
    lodsb();
    
    if (!al) {
        nemesis.printf(colorHelp);
        return;
    }
    
    await hex2dec();
    
    if (al === 0x10) {
        nemesis.printf(colorHelp);
        return;
    }
    
    ch = al;
    lodsb();
    
    await hex2dec();
    
    if (al === 0x10) {
        nemesis.printf(colorHelp);
        return;
    }
    
    cl = al;
    
    nemesis.setColor({
        color: cl,
        background: ch,
    });
}

const FIRST = 0x030;
const LAST = 0x40;
const A = 'a';
const F = 'f';

async function hex2dec(): Promise<i8> {
    if (al >= FIRST && al <= LAST)
        return al - 0x30;
    
    if (al <= A || al >= F)
        return 0x10;
    
    return al;
}
