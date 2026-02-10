import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-jz-to-jmp', plugin],
    ],
});

test('optimizer-fasm: convert-jz-to-jmp: report', (t) => {
    t.report('convert-jz-to-jmp', `Avoid useless 'jz'`);
    t.end();
});

test('optimizer-fasm: convert-jz-to-jmp: transform', (t) => {
    t.transform('convert-jz-to-jmp');
    t.end();
});

test('optimizer-fasm: convert-jz-to-jmp: transform: test', (t) => {
    t.transform('test');
    t.end();
});

test('optimizer-fasm: convert-jz-to-jmp: transform: label', (t) => {
    t.transform('label');
    t.end();
});

test('optimizer-fasm: convert-jz-to-jmp: transform: same-name', (t) => {
    t.transform('same-name');
    t.end();
});

test('optimizer-fasm: convert-jz-to-jmp: transform: cmp', (t) => {
    t.transform('cmp');
    t.end();
});
