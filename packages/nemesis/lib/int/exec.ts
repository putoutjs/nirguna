import {nemesis} from '@nirguna/operator-nemesis';
import {i16} from '@nirguna/operator-fasm';
import {getFileSecSize} from './find-file/file-sec-size';
import {getFileOffset} from './find-file/file-offset';

let exec_addr: i16 = 0x500;
let NOT_FOUND = 'not found :(!';

// bx - file name
export async function exec() {
    debug('executing...');
    di = bx;
    cx = 3;
    ax = nemesis.findFile(bx);
    
    if (ax) {
        debug('not found');
        return;
    }
    
    debug('found');
    // При секридинге максимальный размер ядра 8.5 кб...
    do {
        push(cx);
        ax = await getFileOffset();
        al -= 2;
        cx = 0x200;
        mul(cx);
        ax += 0x4200;
        cwd();
        div(cx);
        // получаем количество секторов в ax
        cx = 18; //дорожка
        cwd();
        div(cx);
        // в ax номер дорожки
        // в dx номер сектора на дорожке
        ++dl;
        cl = dl;
        dx = ax; //смотрим парная ли дорожка
        push(dx);
        bx = 2;
        cwd();
        div(bx);
        ch = al; //в ch номер дорожки
        mul(bx);
        // если парная - нужно перевернуть
        // дискету a.k.a головке один
        pop(dx);
        
        dh = dx === 1 ? 1 : 0;
        ah = await getFileSecSize();
        
        al = nemesis.readSector({
            count: ah,
            buffer: [exec_addr],
            sector: cl,
            track: ch,
            head: dh,
        });
        
        if (!al)
            break;
        
        pop(cx);
    } while (--cx);
    
    // не нашли o_O
    if (al) {
        nemesis.printf(NOT_FOUND);
        return 1;
    }
    
    call([exec_addr]);
    return 0;
}
