const EQZ = [
    'i32',
    'i64',
];

export const report = () => {
    return `Use 'i32.eqz()' instead of 'i32.eq'`;
};

export const match = () => ({
    '__a.eq(local.get(__b), __a.const(0))': ({__a}) => {
        return EQZ.includes(__a.name);
    },
    '__a.eq(__a.const(0), local.get(__b))': ({__a}) => {
        return EQZ.includes(__a.name);
    },
});

export const replace = () => ({
    '__a.eq(local.get(__b), __a.const(0))': '__a.eqz(local.get(__b))',
    '__a.eq(__a.const(0), local.get(__b))': '__a.eqz(local.get(__b))',
});
