export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const replace = () => ({
    'export const memory = [__a, __b]': '__nirguna_wasm_memory(__a, __b)',
});
