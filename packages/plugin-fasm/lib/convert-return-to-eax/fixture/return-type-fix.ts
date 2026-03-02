function compare() {
    if (eax === ebx) {
        eax = 5;
        ret();
    }
    
    {
        eax = 3;
        ret();
    }
}
