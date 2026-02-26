'use 16';

org(0x7e00);
use16();

cli();
push(ax);
push(es);
mov(ax, 0);
mov(es, ax);
mov(ax, __nirguna_intTable);
es[0xff * 4] = ax;
es[0xff * 4 + 2] = cs;
pop(es);
pop(ax);
sti();
let old_esi: i16 = 0;
let old_ds: i16 = 0;
let error_reading2 = 'error reading the file o_O';
let file_sec_size = 0;
let file_size: i16 = 0;
let file_offset: i16 = 0;
let maxcol = 79;
let maxline = 24;
let minline = 0;
let not_f = 'sh3ll not found :(!';
let buf: rb = 0x10;
let sh3ll = 'SH3LL ';

let hi = [
    'Hello from Nemesis =)!',
    0xd,
];

async function get() {
    let eax = 3;
}
