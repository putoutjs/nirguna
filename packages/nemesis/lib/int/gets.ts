import {nemesis} from '@nirguna/operator-nemesis';

const BACKSPACE = 0xe;
const ENTER = 0xd;

//:;в bx ложится буфер
//;в сx ложится кол-во символов
export async function gets() {
    push(bx);
    
    do {
        di = bx;
        nemesis.getChar();
        push(ax);
        stosb();
        nemesis.printf(bx);
        ++bx;
        pop(ax);
        
        if (al === BACKSPACE) {
            ++cx;
            
            --bx;
            --di;
            pop(ax);
            push(ax);
            cmp(di, ax);
            
            if (di !== ax) {
                ++cx;
                --bx;
                al = 0;
                stosb();
                --di;
            }
            
            al = 0;
            --di;
            stosb();
        }
        
        if (al === ENTER)
            break;
    } while (--cx);
    --di;
    al = 0;
    stosb();
    pop(bx);
}
