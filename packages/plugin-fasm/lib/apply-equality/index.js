export const report = () => `Use '===' and '!==' when comparing with zero`;

export const replace = () => ({
    'if (!__identifier__a) __b': 'if (__identifier__a === 0) __b',
    'if (__identifier__a) __b': 'if (__identifier__a !== 0) __b',
    'if (!__identifier__a) __b; else __c': 'if (__identifier__a === 0) __b; else __c',
    'if (__identifier__a) __b; else __c': 'if (__identifier__a !== 0) __b; else __c',
});
