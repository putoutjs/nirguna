import {i16} from '@nirguna/operator-fasm';
import {nemesis} from '@nirguna/operator-nemesis';
import {setFileSecSize} from './file-sec-size';
import {setFileOffset} from './file-offset';

let file_size: i16 = 0;

// Считываем сектор, в котором находятся записи об
// именах файлах и данных о них и ищем название
export async function findFile() {
    di = bx;
    push(di);
    push(bx);
    do {
        push(cx);
        debug('find file: read sector');
        al = nemesis.readSector({
            count: 1,
            buffer: 0x7c00,
            sector: 2,
            track: 0,
            head: 1,
        });
        
        if (!al) {
            pop(cx);
            debug('find file: read sector: ok');
            break;
        }
        
        debug('find file: read sector: not ok');
        
        pop(cx);
    } while (--cx);
    
    if (al) {
        pop(di);
        pop(cx);
        al = 0;
        debug('find file: not found');
        
        return;
    }
    
    si = 0x7c00;
    find_file_in_fat: pop(di);
    push(di);
    push(si);
    
    _strcmp: lodsb();
    cmp([di], al);
    jnz(_strcmp_end);
    ++di;
    jmp(_strcmp);
    // не нашли если
    _strcmp_end: pop(si);
    cmp(al, 0x20);
    jnz(not_equal);
    al = 0;
    not_equal: or(al, al);
    jz(find_all_good);
    si += 0x20;
    lodsb();
    or(al, al);
    jz(file_not_found);
    --si;
    jmp(find_file_in_fat);
    
    find_all_good: si += 0x1a;
    lodsw();
    await setFileOffset();
    lodsw();
    [file_size] = ax;
    bx = 0x200;
    cwd();
    div(bx);
    
    if (dl)
        ++al;
    
    await setFileSecSize();
    pop(di);
    pop(cx);
    al = 0;
    debug('all good');
    ret();
    // нашли =)!!!
    file_not_found: pop(di);
    pop(cx);
    debug('file not found: ret');
    
    al = 1; // Ничего не нашли o_O ...
}
