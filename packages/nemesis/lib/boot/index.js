import {
    org,
    use16,
    bios,
} from '@nirguna/operator-fasm';
import {getStringLength} from '../string/get-string-length.ts';
import {printf} from './printf.js';
import {reboot} from './reboot.js';

org(0x7c00);
use16();

section: 'const';
let loader_name = 'Nemesis Loader o_O';
let error_reading = 'error: read';
let kernel_found = 'kernel found';
let error_finding = 'error: kernel not found';
let error_kernel_file = 'kernel not load';
let kernel_load = 'kernel load';
let kernel_name = 'KERNEL';

boot: jmp(start);
line.db = 0;
// Standard BIOS Parameter Block, "BPB".   ;
bpbOEM.db = 'nemesis ';
bpbSectSize.dw = 512;
bpbClustSize.db = 1;
bpbReservedSec.dw = 1;
bpbFats.db = 2;
bpbRootSize.dw = 224;
bpbTotalSect.dw = 2880;
bpbMedia.db = 240;
bpbFatSize.dw = 9;
bpbTrackSect.dw = 18;
bpbHeads.dw = 2;
bpbHiddenSect.dd = 0;
kernel_offset.dw = 0;
kernel_size.dw = 0;
// extended BPB for FAT12/FAT16   ;
bpbDriveNo.db = 0;
kernel_sec_size.db = 0;
bpbSignature.db = 41; // 0 = nothing more. 41 = three more (below)..;
bpbID.dd = 1;
bpbVolumeLabel.db = 'BOOT FLOPPY';
bpbFileSystem.db = 'FAT12   ';

const kernel_begin = 0x7e00;

async function start() {
    ax = 0;
    ds = ax;
    es = ax;
    ss = ax;
    --ax;
    sp = 0x7c00;
    
    bios.clearScreen();
    
    await printf(loader_name);
    
    ax = bios.readSector({
        count: 1,
        buffer: kernel_begin,
        sector: 2,
        track: 0,
        head: 1,
        disk: 0,
    });
    
    if (ax) {
        await printf(error_reading);
        await reboot();
        
        return;
    }
    
    bx = kernel_begin;
    
    do {
        di = kernel_name;
        ax = await getStringLength(di);
        cx = strncmp(bx, di, ax);
        
        if (cx) {
            bx += 0x20;
            si = bx;
            lodsb();
            
            if (!al) {
                // в корне ядра нет :(
                await printf(error_finding);
                await reboot();
                
                return;
            }
        }
    } while (cx);
    si += 0x14;
    lodsw();
    [kernel_offset] = ax;
    lodsw();
    [kernel_size] = ax;
    cx = 0x200;
    cwd();
    div(cx);
    
    if (dx)
        ++al;
    
    [kernel_sec_size] = al;
    await printf(kernel_found);
    
    cx = 3;
    // Грузим ядро
    do {
        push(cx);
        
        bx = kernel_begin; // ;$a000 ;buffer
        ax = [kernel_offset];
        al -= 2;
        cx = 0x200; //track/sector 0/2
        mul(cx);
        ax += 0x4200;
        cwd(); // необязательно... но, мало ли... лучше
        div(cx);
        // пропишем, что б потом неожиданностей не было...
        // получаем количество секторов в ax
        cx = 18; //дорожка
        cwd();
        div(cx);
        // в ax номер дорожки
        // в dx номер сектора на дорожке
        ++dl;
        cl = dl; // номер сектора
        dx = ax; // смотрим парная ли дорожка
        push(dx);
        push(bx);
        bx = 2;
        div(bx);
        ch = al;
        // дискету a.k.a головке один
        pop(bx);
        pop(dx);
        
        dh = dx === 1 ? 1 : 0;
        ax = bios.readSector({
            count: [kernel_sec_size],
            buffer: bx,
            sector: cl,
            track: ch,
            head: dh,
            disk: 0,
        });
        
        if (!ax) {
            await printf(kernel_load);
            jmp(kernel_begin);
        }
        
        pop(cx);
    } while (--cx);
    
    if (ax)
        await printf(error_kernel_file);
}

section: 'code';
section: 'data';
(rb, 0x200 - ($ - boot) - 2);
db(0x55, 0xaa);
