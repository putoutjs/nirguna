xor(eax, eax);

hello: x();
xor(eax, eax);

hello: x();
xor(eax, eax);
m: jnz(hello);
hello: x();
x();

xor(eax, eax);
x: jz(hello);
hello: x();
