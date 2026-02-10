minline.db = 0;
maxline.db = 24;
maxcol.db = 79;
textcolor.db = 2;

bgcolor.db = 0;
file_offset.dw = 0;
file_size.dw = 0;
file_sec_size.db = 0;
(error_reading.db = 'error reading the file o_O', 0);
const error_reading2 = 'error reading the file o_O';

exec_addr.dw = 0x500;
old_ds.dw = 0;
old_esi.dw = 0;

const hi = [
    'Hello from Nemesis =)!',
    0xd,
];

buf.rb = 0x10;

export const compare = (eax) => {
    if (!eax)
        return 1;
    
    return 0;
};

const x = () => {};
