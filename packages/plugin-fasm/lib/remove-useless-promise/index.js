export const report = () => `Avoid useless 'Promise' type`;

export const replace = () => ({
    'async function __a(__args): Promise<__b> {__body}': 'async function __a(__args): __b {__body}',
});
