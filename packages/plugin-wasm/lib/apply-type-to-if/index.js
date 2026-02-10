export const report = () => `Add type to if condition`;

export const match = () => ({
    'if (i32.__a(__b.__c(__d), __e.__f(__g))) __h; else __i': (vars, path) => !path.node.test.typeArguments,
});

export const replace = () => ({
    'if (i32.__a(__b.__c(__d), __e.__f(__g))) __h; else __i': 'if (i32.__a<i32>(__b.__c(__d), __e.__f(__g))) __h; else __i',
});
