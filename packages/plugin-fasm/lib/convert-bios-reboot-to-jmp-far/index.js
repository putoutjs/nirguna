export const report = () => `Use 'jmp far' instead of 'bios.reboot()'`;

export const replace = () => ({
    'bios.reboot()': `jmp.far('0xFFFF:0x0000')`,
});
