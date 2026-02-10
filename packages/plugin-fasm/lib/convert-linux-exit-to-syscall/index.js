export const report = () => `Use 'syscall' instead of 'linux.exit()'`;

export const match = () => ({
    'linux.exit(__a)': (vars, path) => {
        return path.parentPath.isExpressionStatement();
    },
});

export const replace = () => ({
    'linux.exit(__a)': `{
        rdi = __a;
        rax = 60;
        syscall();
    }`,
});
