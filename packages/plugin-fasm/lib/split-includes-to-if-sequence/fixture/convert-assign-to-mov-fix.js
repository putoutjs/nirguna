{
    if (al === LEFT_SHIFT) {
        mov([shift], 1);
        jmp(again);
    }
    
    if (al === RIGHT_SHIFT) {
        mov([shift], 1);
        jmp(again);
    }
}
