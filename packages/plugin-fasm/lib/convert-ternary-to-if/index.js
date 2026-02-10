export const report = () => `Use 'if' instead of 'ternary'`;

export const replace = () => ({
    '__a = __b ? __c : __d': 'if (__b) __a = __c; else __a = __d',
});
