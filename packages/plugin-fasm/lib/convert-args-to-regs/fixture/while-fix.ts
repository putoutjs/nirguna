import {ureg} from '@nirguna/operator-fasm';

export async function strcmp() {
    push(bp);
    mov(bp, sp);
    mov(ax, 0);
    mov(si, [bp + 4]);
    mov(di, [bp + 6]);
    mov(cx, -1);
    
    cld();
    
    __nirguna_while_11: {
        {
            lodsb();
            test(al, al);
        }
        jz(__nirguna_while_end_11);
        
        if (al !== [di])
            (jmp(__nirguna_while_end_11));
        
        ++di;
        ++cx;
        jmp(__nirguna_while_11);
    }
    __nirguna_while_end_11: {
        pop(bp);
        ret(4);
    }
}
