'use 16';

org(0x7e00);
use16();
_secwrite.equ = 0xd;
_secread.equ = 0xc;
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
