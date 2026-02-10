export const report = () => `Avoid useless declarations`;

export const replace = () => ({
    'import __imports from "#operator-wasm"': '',
    'import __imports from "#operator-fasm"': '',
    'use32()': '',
    'export const stack = []': '',
    'const stack = []': '',
    'const __a = create(__b)': '',
});
