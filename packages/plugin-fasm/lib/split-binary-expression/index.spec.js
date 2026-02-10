import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-binary-expression', plugin],
    ],
});

test('fasm: split-binary-expression: report', (t) => {
    t.report('split-binary-expression', `Split 'binary expression'`);
    t.end();
});

test('fasm: split-binary-expression: transform', (t) => {
    t.transform('split-binary-expression');
    t.end();
});

test('fasm: split-binary-expression: transform: same-add', (t) => {
    t.transform('same-add');
    t.end();
});

test('fasm: split-binary-expression: no report: const', (t) => {
    t.noReport('const');
    t.end();
});

test('fasm: split-binary-expression: no report: type', (t) => {
    t.noReport('type');
    t.end();
});
