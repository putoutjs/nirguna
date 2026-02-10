__nirguna_do_while_1: {
    push(cx);
    cx = 0x200;
    pop(cx);
    
    if (ax === 0)
        (jmp(__nirguna_do_while_break_1));
    
    loop(__nirguna_do_while_1);
}
__nirguna_do_while_break_1: nop();
