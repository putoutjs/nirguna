'use 16';

function getStringLength(str) {
    const usi = str;
    const ucx = 0;
    const al = 1;
    
    __nirguna_while_8: {
        test(al, al);
        jz(__nirguna_while_end_8);
        lodsb();
        ++ucx;
        jmp(__nirguna_while_8);
    }
    __nirguna_while_end_8: return ucx;
}
