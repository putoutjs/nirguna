export const report = () => `Use 'i32.eq' instead of '==='`;

export const replace = () => ({
    '__a === i32.const(__b)': 'i32.eq(__a, __b)',
    '__a === __b': 'i32.eq(__a, __b)',
});
