export const report = () => `Use 'shl()' instead of 'assign'`;

export const replace = () => ({
    '__a <<= __b': 'shl(__a, __b)',
});
