import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['replace-section-const-with-equ', plugin],
    ],
});

test('bundler-fasm: replace-section-const-with-equ: report', (t) => {
    t.report('replace-section-const-with-equ', `Replace section 'const' with 'equ'`);
    t.end();
});

test('bundler-fasm: replace-section-const-with-equ: transform', (t) => {
    t.transform('replace-section-const-with-equ');
    t.end();
});

test('bundler-fasm: replace-section-const-with-equ: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('bundler-fasm: replace-section-const-with-equ: transform: no-const', (t) => {
    t.transform('no-const');
    t.end();
});
