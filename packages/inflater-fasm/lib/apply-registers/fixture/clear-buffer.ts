function clearBuffer(buffer) {
    'reg clear-buffer buffer=di,si i=-';
    
    let i = 0;
    
    while (buffer[i]) {
        buffer[i] = 0;
        i++;
    }
}
