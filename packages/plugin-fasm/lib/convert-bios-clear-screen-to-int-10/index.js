export const report = () => `Use '0x10' instead of 'bios.clearScreen()'`;

export const replace = () => ({
    'bios.clearScreen()': `{
        ax = 3;
        int(0x10);
    }`,
});
