function getStringLength() {
    pop(esi);
    cx = 0;
    
    do {
        lodsb();
        ++cx;
    } while (test(al, al))
    
    return cx;
}