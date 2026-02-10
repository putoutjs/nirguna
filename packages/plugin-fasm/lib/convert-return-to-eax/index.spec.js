import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-return-to-eax', plugin],
    ],
});

test('fasm: convert-return-to-eax: report', (t) => {
    t.report('convert-return-to-eax', `Use 'eax' instead of 'return'`);
    t.end();
});

test('fasm: convert-return-to-eax: transform', (t) => {
    t.transform('convert-return-to-eax');
    t.end();
});

test('fasm: convert-return-to-eax: transform: cx', (t) => {
    t.transform('cx');
    t.end();
});

test('fasm: convert-return-to-eax: transform: di', (t) => {
    t.transform('di');
    t.end();
});

test('fasm: convert-return-to-eax: transform: si', (t) => {
    t.transform('si');
    t.end();
});

test('fasm: convert-return-to-eax: transform: type', (t) => {
    t.transform('type');
    t.end();
});
