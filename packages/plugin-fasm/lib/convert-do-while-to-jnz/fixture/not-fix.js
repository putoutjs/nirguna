__nirguna_do_while_1: {
    di = kernel_name;
    ax = await getStringLength(di);
    cx = strncmp(bx, di, ax);
    test(cx, cx);
    jz(__nirguna_do_while_1);
}
