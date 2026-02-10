export const report = () => `Use 'function declaration' instead of 'arrow function expression'`;

export const replace = () => ({
    'const __a = (__args): __c => {__body}': 'function __a(__args): __c {__body}',
    'const __a = (__args) => {__body}': 'function __a(__args) {__body}',
    'const __a = (__args) => __b': 'function __a(__args) {return __b}',
});
