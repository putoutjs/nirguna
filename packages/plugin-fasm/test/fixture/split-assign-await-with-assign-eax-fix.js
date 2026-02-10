{
    mov(cx, ax);
    {
        push(szkernel_name);
        call(getStringLength);
    }
    xchg(cx, ax);
}
{
    mov(ecx, eax);
    {
        push(szkernel_name);
        call(getStringLength);
    }
    xchg(ecx, eax);
}
