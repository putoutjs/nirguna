__nirguna_do_while_1: {
    (jmp(__nirguna_do_while_condition_1));
    __nirguna_do_while_condition_1: loop(__nirguna_do_while_1);
}
__nirguna_do_while_5: {
    (jmp(__nirguna_do_while_condition_5));
    __nirguna_do_while_condition_5: test(al, al);
    jnz(__nirguna_do_while_5);
}
__nirguna_do_while_9: {
    (jmp(__nirguna_do_while_condition_9));
    __nirguna_do_while_condition_9: test(al, al);
    jz(__nirguna_do_while_9);
}
