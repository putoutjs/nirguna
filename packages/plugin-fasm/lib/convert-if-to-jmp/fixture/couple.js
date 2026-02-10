if (al === _enter) {
    inc([line]);
    [col] = 0;
    cmp([line], 25);
    jl(_nopoint2write);

    await scroll();

    dec([line]);
    jmp(_nopoint2write);
}

if (al === _backspace) {
    al = 0;
    ah = [mincol];

    if (ah === [col])
        jmp(_nopoint2write);

    dec([col]);
    dec([col]);
    di -= 2;
}
