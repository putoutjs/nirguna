export function strcmp(a, b) {
    let i = 0;
    
    while (a[i]) {
        if (a[i] !== b[i])
            return 1;
        
        i++;
    }
    
    return 0;
}
