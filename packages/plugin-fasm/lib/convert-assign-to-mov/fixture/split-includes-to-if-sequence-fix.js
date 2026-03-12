cmp(al, LEFT_SHIFT);
jnz(__nirguna_fasm_if_end_1);
mov([shift], 1);
jmp(again);
__nirguna_fasm_if_end_1: {
    cmp(al, RIGHT_SHIFT);
    jnz(__nirguna_fasm_if_end_2);
    mov([shift], 1);
    jmp(again);
}
__nirguna_fasm_if_end_2: nop();
