export async function clearBuffer(buffer) {
    di = buffer;
    si = buffer;
    
    while (lodsb()) {
        al = 0;
        stosb();
    }
}
