function printf() {
    {
        cmp(eax, 0);
        jz(__nirguna_fasm_if_end_1);
        {
            ret;
        }
    }
    __nirguna_fasm_if_end_1: eax = 1;
}
