import {org, use16} from '@nirguna/operator-fasm';

org(0x7C00);
use16();

function start() {
    debug('hello world')
}

section: 'data';
section: 'code';

(rb, 0x200 - ($ - start) - 2);
(dw, 0xAA55);