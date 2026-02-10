__nirguna_do_while_1: {
    push(cx);
    cx = 0x200;
    pop(cx);
    
    {
        cmp(ax, 0);
        jnz(__nirguna_fasm_if_end_1);
        (jmp(__nirguna_do_while_break_1));
    }
    __nirguna_fasm_if_end_1: loop(__nirguna_do_while_1);
}
__nirguna_do_while_break_1: nop();
