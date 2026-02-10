_reboot.equ = 0;
_get_char.equ = 1;
_printf.equ = 2;
_find_file.equ = 3;
_exec.equ = 4;

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
