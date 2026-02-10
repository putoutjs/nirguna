export async function getStringLength(): ureg {
    pop(uax);
    pop(usi);
    push(uax);
    ucx = -1;
    cld();

    do {
        lodsb();
        ++ucx;
    } while (al);

    return ucx;
}
