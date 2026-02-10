export const report = () => `Avoid useless 'xchg'`;

export const replace = () => ({
    'xchg(__a, __a)': '',
});
