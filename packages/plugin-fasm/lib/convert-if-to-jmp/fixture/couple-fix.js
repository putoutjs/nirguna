{
    cmp(al, _enter);
    jnz(__nirguna_fasm_if_end_1);
    {
        inc([line]);
        [col] = 0;
        cmp([line], 25);
        jl(_nopoint2write);
        
        await scroll();
        
        dec([line]);
        jmp(_nopoint2write);
    }
}
__nirguna_fasm_if_end_1: {
    cmp(al, _backspace);
    jnz(__nirguna_fasm_if_end_2);
    {
        al = 0;
        ah = [mincol];
        
        {
            cmp(ah, [col]);
            jnz(__nirguna_fasm_if_end_3);
            jmp(_nopoint2write);
        }
        __nirguna_fasm_if_end_3: dec([col]);
        dec([col]);
        di -= 2;
    }
}
__nirguna_fasm_if_end_2: nop();
