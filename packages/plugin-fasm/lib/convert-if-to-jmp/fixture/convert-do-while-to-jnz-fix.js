function x() {
    __nirguna_do_while_2: cmp(cx, 0);
    jz(__nirguna_fasm_if_end_1);
    lodsb();
    __nirguna_fasm_if_end_1: nop();
    test(cx, cx);
    jz(__nirguna_do_while_2);
}
