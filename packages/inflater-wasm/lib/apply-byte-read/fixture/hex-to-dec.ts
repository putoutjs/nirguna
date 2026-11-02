export function hexToDec(hex) {
    if (hex >= 0x30 && hex <= 0x39)
        return hex - 0x30;
    
    if (hex >= 0x41 && hex <= 0x46)
        return hex - 0x37;
    
    if (hex >= 0x61 && hex <= 0x66)
        return hex - 0x57;
    
    return 0x10;
}
