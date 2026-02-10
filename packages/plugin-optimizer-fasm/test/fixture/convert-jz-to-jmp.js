xor(eax, eax);
jz(hello);
hello: x();

xor(eax, eax);
jnz(hello);
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