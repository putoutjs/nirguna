const createBinary = (address) => `{
    org(${address});
    use16();
}`;

export const TARGETS = {
    linux: {
        size: 8,
        bits: 'i64',
        code: `{
            format.ELF64.executable;
            entry.$;
        }`,
    },
    kernel: {
        size: 2,
        bits: 'i16',
        code: createBinary('0x7e00'),
    },
    boot: {
        size: 2,
        bits: 'i16',
        code: createBinary('0x7c00'),
    },
    nemesis: {
        size: 2,
        bits: 'i16',
        code: createBinary('0x500'),
    },
};
