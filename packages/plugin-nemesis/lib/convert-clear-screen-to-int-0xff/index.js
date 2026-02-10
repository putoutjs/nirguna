export const report = () => `Use '0xff' instead of 'nemesis.clearScreen()'`;

const CLEAR_SCREEN = 9;

export const replace = () => ({
    'nemesis.clearScreen()': () => {
        return `{
            al = ${CLEAR_SCREEN};
            int(0xff);
        }`;
    },
});
