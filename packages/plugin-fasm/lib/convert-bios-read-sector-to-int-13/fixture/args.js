ax = bios.readSector({
    count: 1,
    buffer: kernel_begin,
    sector: 2,
    track: 0,
    head: 1,
    disk: 0,
});
