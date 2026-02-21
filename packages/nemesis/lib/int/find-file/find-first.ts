// ложим в bх хендл(номер ;))файла
// в ax будет лежать имя
import {nemesis} from '@nirguna/operator-nemesis';

export async function findFirst() {
    push(bx);
    cx = 3;
    sec_reading_find: push(cx);
    al = nemesis.readSector({
        count: 1,
        buffer: 0x7c00,
        sector: 2,
        track: 0,
        head: 1,
    });
    pop(cx);
    
    if (al)
        loop(sec_reading_find);
    
    find_sec_loaded: si = 0x7c00 - 0x20;
    pop(cx);
    
    find_file_search: si += 0x20;
    lodsb();
    
    if (!al)
        return 0;
    
    --si;
    loop(find_file_search);
    
    return si;
}
