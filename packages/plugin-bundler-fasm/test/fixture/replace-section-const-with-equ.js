_secread.equ = 0xc;
_secwrite.equ = 0xd;

org(0x7e00);
use16();

section: 'const';

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
