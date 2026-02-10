import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';
import {matchToFlat} from '@putout/eslint-flat';

export const match = {
    '**/scripts/**/*.js': {
        'n/hashbang': 'off',
    },
};
export default defineConfig([
    safeAlign, {
        ignores: ['example.*', '**/fixture'],
        rules: {
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
            'no-undef': 'off',
            'prefer-const': 'off',
            'no-constant-condition': 'off',
        },
    },
    ...matchToFlat(match),
]);
