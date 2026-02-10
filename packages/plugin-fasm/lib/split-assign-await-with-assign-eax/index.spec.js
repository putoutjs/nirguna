import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-assign-await-with-assign-eax', plugin],
    ],
});

test('fasm: split-assign-await-with-assign-eax: report', (t) => {
    t.report('split-assign-await-with-assign-eax', `Get result from 'eax'`);
    t.end();
});

test('fasm: split-assign-await-with-assign-eax: transform', (t) => {
    t.transform('split-assign-await-with-assign-eax');
    t.end();
});

test('fasm: split-assign-await-with-assign-eax: transform: 8-bit', (t) => {
    t.transform('8-bit');
    t.end();
});

test('fasm: split-assign-await-with-assign-eax: transform: 64-bit', (t) => {
    t.transform('64-bit');
    t.end();
});

test('fasm: split-assign-await-with-assign-eax: transform: label', (t) => {
    t.transform('label');
    t.end();
});
