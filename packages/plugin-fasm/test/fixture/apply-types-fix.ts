minline.db[0];
maxline.db[0x18];
maxcol.db[0x4f];
textcolor.db[2];

bgcolor.db[0];
file_offset.dw[0];
file_size.dw[0];
file_sec_size.db[0];
(error_reading.db['error reading the file o_O'], 0);
error_reading2.equ['error reading the file o_O'];
exec_addr.dw[0x500];
old_ds.dw[0];
old_esi.dw[0];

hi.equ[[
    'Hello from Nemesis =)!',
    0xd,
]];
buf.rb[0x10];

export const compare = (eax) => {
    {
        cmp(eax, 0);
        jnz(__nirguna_fasm_if_end_1);
        {
            mov(ax, 1);
            ret();
        }
    }
    __nirguna_fasm_if_end_1: mov(ax, 0);
    ret();
};

x.equ[() => {}];
