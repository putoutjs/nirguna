export const report = () => `Apply increment/decrement`;

export const replace = () => ({
    '[++__a]': 'inc([__a])',
    '++__a': 'inc(__a)',
    '[--__a]': 'dec([__a])',
    '--__a': 'dec(__a)',
});
