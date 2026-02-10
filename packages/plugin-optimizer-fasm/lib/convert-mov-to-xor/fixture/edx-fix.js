xor(eax, eax);
cdq();

xor(eax, eax);
{
    cdq();
    inc(edx);
}
xor(edx, edx);
{
    xor(edx, edx);
    inc(edx);
}
