{
    cmp(dx, 1);
    jnz(__nirguna_fasm_if_else_1);
    mov(dh, 1);
    jmp(__nirguna_fasm_if_end_1);
    __nirguna_fasm_if_else_1: mov(dh, 0);
}
__nirguna_fasm_if_end_1: nop();
