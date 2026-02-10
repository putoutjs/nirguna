function compare() {
    {
        cmp(eax, ebx);
        jnz(__nirguna_fasm_if_end_1);
        
        return 5;
    }
    __nirguna_fasm_if_end_1: return 3;
}
