[].includes();
[a].includes();
notDeclared.includes();

notArray.equ[getArray()];
notArray.includes();

{
    {
        cmp(al, LEFT_ALT);
        jnz(__nirguna_fasm_if_end_1);
        jmp(again);
    }
    __nirguna_fasm_if_end_1: cmp(al, LEFT_ALT_UP);
    jnz(__nirguna_fasm_if_end_2);
    jmp(again);
    __nirguna_fasm_if_end_2: nop();
    {
        cmp(al, LEFT_CTRL);
        jnz(__nirguna_fasm_if_end_3);
        jmp(again);
    }
    __nirguna_fasm_if_end_3: cmp(al, LEFT_CTRL_UP);
    jnz(__nirguna_fasm_if_end_4);
    jmp(again);
    __nirguna_fasm_if_end_4: nop();
}
