import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    safeAlign, {
        ignores: ['example.*', '**/fixture'],
        rules: {
            "n/no-unpublished-import",
            '@typescript-eslint/ban-ts-comment': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-unused-expressions': 'off',
        },
    },
]);
