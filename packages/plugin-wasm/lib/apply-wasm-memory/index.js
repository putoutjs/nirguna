export const report = () => `Use '__nirguna_wasm_memory' instead of 'export const memory'`;

export const replace = () => ({
    'export const memory = [__a, __b]': '__nirguna_wasm_memory(__a, __b)',
    'const memory = [__a, __b]': '__nirguna_wasm_memory(__a, __b)',
});
