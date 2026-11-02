export function hex2dec(hex) {
    if (hex >= 0x30 && hex <= 0x40)
        return hex - 0x30;
    
    if (hex <= 0x61 || hex >= 0x66)
        return 0x10;
    
    return hex;
}
