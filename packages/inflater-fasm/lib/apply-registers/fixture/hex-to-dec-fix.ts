async function hexToDec(): i8 {
    if (al >= 0x30 && al <= 0x39)
        return al - 0x30;
    
    if (al >= 0x41 && al <= 0x46)
        return al - 0x37;
    
    if (al >= 0x61 && al <= 0x66)
        return al - 0x57;
    
    return 0x10;
}
