export const report = () => `Use 'add' instead of 'mov'`;

export const replace = () => ({
    'mov(__a, __a + __b)': 'add(__a, __b)',
});
