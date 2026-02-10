export async function strcmp() {
    push(bp);
    mov(bp, sp);
    mov(ax, [bp + 4]);
    mov(bx, [bp + 6]);
    
    ax += bx;
    end: {
        pop(bp);
        ret(4);
    }
}

export async function noBodyInsideLabel() {
    push(bp);
    mov(bp, sp);
    mov(ax, [bp + 4]);
    mov(bx, [bp + 6]);
    
    ax += bx;
    pop(bp);
    ret(4);
}
