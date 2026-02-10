do {
    di = kernel_name;
    ax = await getStringLength(di);
    cx = strncmp(bx, di, ax);
} while (!cx);
