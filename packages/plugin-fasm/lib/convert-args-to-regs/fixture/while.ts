import {ureg} from "@nirguna/operator-fasm";

export async function strcmp(a, b): ureg {
    let uax = 0;
    let usi = a;
    let udi = b;
    let ucx = -1;

    cld();

    while (lodsb()) {
        if (al !== [udi])
            break;

        ++udi;
        ++ucx;
    }

    return uax;
}