function getStringLength(str): i64 {
    const rsi = str;
    const rcx = 0;
    const al = 1;
    
    while (al) {
        lodsb();
        ++rcx;
    }
    
    return rcx;
}
