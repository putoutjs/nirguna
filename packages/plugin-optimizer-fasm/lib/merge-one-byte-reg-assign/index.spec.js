import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-one-byte-reg-assign', plugin],
    ],
});

test('optimizer-fasm: merge-one-byte-reg-assign: report: merge-one-byte-reg-assign', (t) => {
    t.report('merge-one-byte-reg-assign', `Assign two-bytes register instead of assigning one-byte registers twice`);
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: transform: merge-one-byte-reg-assign', (t) => {
    t.transform('merge-one-byte-reg-assign');
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: transform: xor', (t) => {
    t.transform('xor');
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: no report: different', (t) => {
    t.noReport('different');
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: transform: mov', (t) => {
    t.transform('mov');
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: no report: not-number', (t) => {
    t.noReport('not-number');
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: transform: const', (t) => {
    t.transform('const');
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: transform: one-reg', (t) => {
    t.transform('one-reg');
    t.end();
});

test('optimizer-fasm: merge-one-byte-reg-assign: no report: no-next', (t) => {
    t.noReport('no-next');
    t.end();
});
