export const report = () => `Use 'int(0xff)' instead of 'nemesis.exec()'`;

export const replace = () => ({
    'nemesis.exec(__a)': `{
    	al = 4;
        bx = __a;
        int(0xff);
    }`,
});
