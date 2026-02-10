export const report = () => `Use '0x10' instead of 'bios.readChar()'`;

export const match = () => ({
    'bios.scroll()': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    'bios.scroll()': `{
        cx = 0; // от 00:00
        ax = 0x601; // Прокрутка вверх на одну строку
        dx = 0x184f; // 24:79 (весь экран)
        int(0x10);
    }`,
});
