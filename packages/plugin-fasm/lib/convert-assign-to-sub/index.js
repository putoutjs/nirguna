export const report = () => `Use 'sub' instead of 'assign'`;

export const replace = () => ({
    '__a -= __b': 'sub(__a, __b)',
});
