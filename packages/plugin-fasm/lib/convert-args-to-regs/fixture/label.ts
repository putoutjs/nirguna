export async function strcmp(a, b) {
    ax = a;
    bx = b;

    ax += bx;
    end: {
        ret();
    }
}

export async function noBodyInsideLabel(a, b) {
    ax = a;
    bx = b;

    ax += bx;
    end: ret();
}
