export async function strcmp(a, b): ureg {
    let uax = 0;
    let usi = a;
    let udi = b;

    cld();

    while (lodsb()) {
        if (al !== [udi]) {
            al = 1;
            break;
        }

        ++udi;
    }

    return uax;
}
