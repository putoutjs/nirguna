export const report = () => `Use 'and(__a, __b)' instead of '__a &= __b'`;

export const replace = () => ({
    '__a &= __b': 'and(__a, __b);',
});
