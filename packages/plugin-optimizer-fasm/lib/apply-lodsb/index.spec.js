import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-lodsb', plugin],
    ],
});

test('optimizer-fasm: apply-lodsb: report', (t) => {
    t.report('apply-lodsb', `Use 'lodsb' instead of assigning 'al'`);
    t.end();
});

test('optimizer-fasm: apply-lodsb: transform', (t) => {
    t.transform('apply-lodsb');
    t.end();
});

test('optimizer-fasm: apply-lodsb: transform: mov', (t) => {
    t.transform('mov');
    t.end();
});

test('optimizer-fasm: apply-lodsb: transform: label', (t) => {
    t.transform('label');
    t.end();
});
