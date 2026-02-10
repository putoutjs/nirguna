__nirguna_add: {
    mov(eax, 0x1);
    mov(ebx, 0x2);
    
    {
        {
            mov(ax, eax);
            add(ax, ebx);
        }
        ret();
    }
}
