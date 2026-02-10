ax = bios.readSector({
    count: [kernel_sec_size],
    buffer: bx,
    sector: cl,
    track: ch,
    head: dh,
    disk: 0,
});
