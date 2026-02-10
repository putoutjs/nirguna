import {nemesis} from '@nirguna/operator-nemesis';
import {
    org,
    use16,
    i16,
    rb,
} from '@nirguna/operator-fasm';
import {intTable} from './int/int-table.ts';

org(0x7e00);
use16();

section: 'const';
cli();
push([ax, es]);

ax = 0;
es = ax;

ax = intTable;

es[0xff * 4] = ax;
es[0xff * 4 + 2] = cs;

pop([es, ax]);
sti();

let shell = 'SH3LL ';
let hi = [
    'Hello from Nemesis =)!',
    0xd,
];

nemesis.printf(hi);
nemesis.exec(shell);

jmp($);

section: 'code';
section: 'data';
let buf: rb = 0x10;
let error_reading2 = 'error reading the file o_O';
let old_ds: i16 = 0;
let old_esi: i16 = 0;
