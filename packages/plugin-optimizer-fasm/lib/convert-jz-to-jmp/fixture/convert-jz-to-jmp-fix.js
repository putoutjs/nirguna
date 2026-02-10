xor(eax, eax);
jmp(hello);
hello: x();
xor(eax, eax);

hello: x();
xor(eax, eax);
m: jnz(hello);
hello: x();
or(eax, eax);
jnz(hello);
hello: x();
xor(eax, eax);
x: jz(hello);
hello: x();
