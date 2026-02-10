__nirguna_fasm_if_5: __nirguna_fasm_if_4: {
    cmp(al, _backspace);
    jnz(__nirguna_fasm_if_end_1);
    {
        ah = await getColumn();
        al = await getMinColumn();
        {
            cmp(ah, al);
            jz(__nirguna_fasm_if_end_2);
            {
                await __nirguna_decColumn();
                await __nirguna_decColumn();
                di -= 2;
            }
        }
        __nirguna_fasm_if_end_2: nop();
    }
}
__nirguna_fasm_if_end_1: nop();
