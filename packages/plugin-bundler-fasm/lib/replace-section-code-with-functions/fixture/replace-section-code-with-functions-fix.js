import {
    org,
    use16,
    bios,
    imports,
} from '@nirguna/operator-fasm';

org(0x7c00);

use16();
boot: jmp(start);
line.db = 0;
// Standard BIOS Parameter Block, "BPB".   ;
bpbOEM.db = 'nemesis ';
async function getStringLength() {
    pop(ax);
    pop(si);
    push(ax);
    cx = -1;
    
    do {
        lodsb();
        ++cx;
    } while (al)
    
    return cx;
}

(loader_name.db = 'Nemesis Loader o_O', 0);
(error_reading.db = 'error: read', 0);
(kernel_found.db = 'kernel found', 0);
(error_finding.db = 'error: kernel not found', 0);
(error_krnlfile.db = 'kernel not load', 0);
(kernel_load.db = 'kernel load', 0);
(press_any_key.db = 'press any key', 0);
(kernel_name.db = 'KERNEL', 0);

(rb, 0x200 - ($ - boot) - 2);
db(0x55, 0xaa);
