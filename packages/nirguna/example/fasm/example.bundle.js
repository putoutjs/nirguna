// example/fasm/a.js
var line = 3;
var col = 0;
var textcolor = 2;

// example/fasm/example.ts
org(31744);
use16();
boot: jmp.short.start();
db.bpbOEM = "nemesis ";
dw.bpbSectSize = 512;
equ(kernel_begin, 32256);
var ax = ax;
push([
  es,
  ax,
  di
]);
ax = 47104;
var es = ax;
ax ^= ax;
var ah = 4;
ah += [textcolor];
var di = 0;
var cx = 25 + 80;
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
  es
]);
iret();
call(write);
rb(512 - $ - boot - 2);
async function write() {
  await clear({
    cl: 1,
    ch: 2
  });
  mov(ax, 3);
  int(255);
}
