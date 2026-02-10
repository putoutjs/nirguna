export const report = () => `Use 'or' instead of 'assign'`;

export const replace = () => ({
    '__a |= __b': 'or(__a, __b)',
});
