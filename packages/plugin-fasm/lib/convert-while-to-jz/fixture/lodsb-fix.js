let esi = str;
let ecx = 0;

__nirguna_while_4: {
    {
        lodsb();
        test(al, al);
    }
    jz(__nirguna_while_end_4);
    ++ecx;
    jmp(__nirguna_while_4);
}
__nirguna_while_end_4: nop();
