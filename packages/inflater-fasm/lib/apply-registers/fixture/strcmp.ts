function strcmp(a, b) {
    'reg strcmp a=si b=di i=-';
    
    let i = 0;
    
    while (a[i]) {
        if (a[i] !== b[i])
            return 1;
        
        i++;
    }
    
    return 0;
}
