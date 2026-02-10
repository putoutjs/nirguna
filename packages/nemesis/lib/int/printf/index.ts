import {nemesis} from '@nirguna/operator-nemesis';
import {getStringLength} from '../../string/get-string-length.js';
import {
    getLine,
    incLine,
    decLine,
} from '../position/line.ts';
import {getMinColumn} from '../position/min-max-col-line.ts';
import {
    getColumn,
    setColumn,
    decColumn,
    incColumn,
} from '../position/column.ts';
import {scroll} from './scroll.ts';
import {getColor} from '../color.ts';

const _enter = 0xd;
const _backspace = 0xe;

export async function printf<es, bx, cx, di>() {
    ax = 0xb800;
    es = ax;
    cx = await getStringLength(bx);
    si = bx;
    
    do {
        bl = await getColumn();
        bh = await getLine();
        
        nemesis.setCursor({
            column: bl,
            line: bh,
        });
        
        di = ax;
        
        lodsb();
        
        if (al === _enter) {
            await incLine();
            bl = 0;
            await setColumn();
            
            al = await getLine();
            
            if (al === 25) {
                await scroll();
                await decLine();
            }
            
            continue;
        }
        
        if (al === _backspace) {
            ah = await getColumn();
            al = await getMinColumn();
            ++al;
            
            if (ah !== al) {
                await decColumn();
                await decColumn();
                di -= 2;
                al = 0;
                ah = await getColor();
                
                stosw();
                
                await incColumn(); // оставляем курсор на месте
            }
            
            continue;
        }
        
        ah = await getColor();
        
        stosw();
        
        await incColumn();
    } while (--cx);
    bl = await getColumn();
    bh = await getLine();
    
    nemesis.setCursor({
        column: bl,
        line: bh,
    });
}
