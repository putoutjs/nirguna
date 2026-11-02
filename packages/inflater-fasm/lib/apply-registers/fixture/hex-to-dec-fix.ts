async function hexToDec(): i8 {
    if (al >= 0x30 && al <= 0x40)
        return al - 0x30;
    
    if (al <= 0x61 || al >= 0x66)
        return 0x10;
    
    return al;
}
