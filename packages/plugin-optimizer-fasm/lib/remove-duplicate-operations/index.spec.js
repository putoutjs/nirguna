import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-duplicate-operations', plugin],
    ],
});

test('optimizer-fasm: remove-duplicate-operations: report', (t) => {
    t.report('remove-duplicate-operations', `Avoid duplicate operations`);
    t.end();
});

test('optimizer-fasm: remove-duplicate-operations: transform', (t) => {
    t.transform('remove-duplicate-operations');
    t.end();
});

test('optimizer-fasm: remove-duplicate-operations: transform: loop', (t) => {
    t.transform('loop');
    t.end();
});

test('optimizer-fasm: remove-duplicate-operations: transform: cmp', (t) => {
    t.transform('cmp');
    t.end();
});

test('optimizer-fasm: remove-duplicate-operations: no report: call', (t) => {
    t.noReport('call');
    t.end();
});

