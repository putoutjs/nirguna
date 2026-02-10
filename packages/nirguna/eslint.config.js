import {safeAlign} from 'eslint-plugin-putout';
import {defineConfig} from 'eslint/config';

export default defineConfig([
    safeAlign, {
        ignores: ['example.*', '**/fixture'],
        rules: {
            'n/no-unpublished-import': 'off',
        },
    },
]);
