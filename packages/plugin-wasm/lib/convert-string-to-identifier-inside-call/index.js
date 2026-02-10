export const report = () => `Use 'identifier' instead of 'string'`;

export const replace = () => ({
    'call("__a")': ({__a}) => {
        return `call(${__a.value})`;
    },
});
