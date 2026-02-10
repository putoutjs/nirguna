import {readSector} from '../../lib/int/sector.ts';
import {
    org,
    use16,
} from '@nirguna/operator-fasm';

org(0x7c00);
use16();

section: 'const';

const QUANTITY = 1;
const BUFFER = 0x7c00;
const SECTOR = 2;
const TRACK = 0;
const DRIVe = 0;
const HEAD = 1;

async function start() {
    debug('find file: read sector');
    
    ah = QUANTITY;
    bx = BUFFER;
    cl = SECTOR;
    ch = TRACK;
    dl = DRIVe;
    dh = HEAD;
    await readSector();
}

section: 'code';
section: 'data';

(rb, 0x200 - ($ - start) - 2);
db(0x55, 0xaa);
