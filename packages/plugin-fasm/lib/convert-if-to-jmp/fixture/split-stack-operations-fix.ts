push(bx);
push(ax);
{
    cmp(al, 0);
    jz(__nirguna_fasm_if_end_1);
    {
        {
            cmp(al, _enter);
            jnz(__nirguna_fasm_if_end_2);
            {}
        }
        __nirguna_fasm_if_end_2: {
            cmp(al, _backspace);
            jnz(__nirguna_fasm_if_end_3);
            {}
        }
        __nirguna_fasm_if_end_3: nop();
    }
}
__nirguna_fasm_if_end_1: {
    pop(ax);
    pop(bx);
}
