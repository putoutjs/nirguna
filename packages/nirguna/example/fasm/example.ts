import {
    line,
    col,
    textcolor,
} from './a.js';

org(0x7c00);
use16();

boot: jmp.short.start();

db.bpbOEM = 'nemesis ';
dw.bpbSectSize = 512;

equ(kernel_begin, 0x7e00);

let ax = ax;

push([
    es,
    ax,
    di,
]);

ax = 0xb800;
const es = ax;

ax ^= ax;

let ah = 4;

ah += [textcolor];
const di = 0;
const cx = 25 + 80;

rep.stosw();
mov([line], 0);
mov([col], 0);

xor(di, 0);
mov(cx, 25 + 80);
rep.stosw();
mov([line], 0);
mov([col], 0);

pop([
    di,
    ax,
    es,
]);
iret();

call(write);
rb(0x200 - $ - boot - 2);

async function write<es, ax, di>() {
    await clear({
        cl: 1,
        ch: 2,
    });
    mov(ax, 3);
    int(0xff);
}
