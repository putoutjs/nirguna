export const report = () => `Use '0x16' instead of 'bios.readChar()'`;

export const match = () => ({
    'bios.readChar()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    'ax = bios.readChar()': `{
        ax = 0;
        int(0x16) 
    }`,
    'bios.readChar()': `{
        ax = 0;
        int(0x16) 
    }`,
});
