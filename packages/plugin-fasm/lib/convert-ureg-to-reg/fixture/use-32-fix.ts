function getStringLength(str): i32 {
    const esi = str;
    const ecx = 0;
    const al = 1;
    
    while (al) {
        lodsb();
        ++ecx;
    }
    
    return ecx;
}
