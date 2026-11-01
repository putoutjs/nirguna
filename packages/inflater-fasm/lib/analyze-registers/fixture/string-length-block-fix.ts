function stringLength(str) {
    'reg string-length str=si n=cx';
    
    let n = 0;
    
    while (str[n]) {
        n++;
    }
    
    return n;
}
