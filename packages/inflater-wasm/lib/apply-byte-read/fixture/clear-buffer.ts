export function clearBuffer(buffer) {
    let i = 0;
    
    while (buffer[i]) {
        buffer[i] = 0;
        i++;
    }
}
