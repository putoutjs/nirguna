import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-const-to-equ', plugin],
    ],
});

test('fasm: convert-const-to-equ: report', (t) => {
    t.report('convert-const-to-equ', `Use 'equ' instead of 'const'`);
    t.end();
});

test('fasm: convert-const-to-equ: transform', (t) => {
    t.transform('convert-const-to-equ');
    t.end();
});
