function getStringLength(str): i16 {
    const si = str;
    const cx = 0;
    const al = 1;
    
    while (al) {
        lodsb();
        ++cx;
    }
    
    return cx;
}
