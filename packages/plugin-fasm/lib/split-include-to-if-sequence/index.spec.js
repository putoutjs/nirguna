import {createTest} from '@putout/test';
import * as convertConstToEqu from '#convert-const-to-equ';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-include-to-if-sequence', plugin],
    ],
});

test('fasm: split-include-to-if-sequence: report', (t) => {
    t.report('split-include-to-if-sequence', `Use 'if condition' instead of 'includes'`);
    t.end();
});

test('fasm: split-include-to-if-sequence: transform', (t) => {
    t.transform('split-include-to-if-sequence');
    t.end();
});

test('fasm: split-include-to-if-sequence: transform: convert-const-to-equ', (t) => {
    t.transform('convert-const-to-equ', {
        convertConstToEqu,
    });
    t.end();
});
