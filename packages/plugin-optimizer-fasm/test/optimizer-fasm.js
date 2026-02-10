import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['optimizer-fasm', fasm],
    ],
});

test('plugin-optimizer-fasm: convert-mov-to-xor', (t) => {
    t.transform('convert-mov-to-xor');
    t.end();
});

test('plugin-optimizer-fasm: transform: merge-one-byte-reg-assign', (t) => {
    t.transform('merge-one-byte-reg-assign');
    t.end();
});

test('plugin-optimizer-fasm: transform: remove-useless-ret', (t) => {
    t.transform('remove-useless-ret');
    t.end();
});

test('plugin-optimizer-fasm: transform: convert-cmp-to-test', (t) => {
    t.transform('convert-cmp-to-test');
    t.end();
});

test('plugin-optimizer-fasm: transform: convert-jz-to-jmp', (t) => {
    t.transform('convert-jz-to-jmp');
    t.end();
});

test('plugin-optimizer-fasm: transform: remove-duplicate-operations', (t) => {
    t.transform('remove-duplicate-operations');
    t.end();
});

test('plugin-optimizer-fasm: transform: remove-useless-mov', (t) => {
    t.transform('remove-useless-mov');
    t.end();
});

test('plugin-optimizer-fasm: transform: remove-useless-condition', (t) => {
    t.transform('remove-useless-condition');
    t.end();
});

test('plugin-optimizer-fasm: transform: remove-useless-nop', (t) => {
    t.transform('remove-useless-nop');
    t.end();
});

test('plugin-optimizer-fasm: transform: remove-useless-jmp', (t) => {
    t.transform('remove-useless-jmp');
    t.end();
});

test('plugin-optimizer-fasm: transform: merge-labels-of-duplicate-instructions', (t) => {
    t.transform('merge-labels-of-duplicate-instructions');
    t.end();
});

test('plugin-optimizer-fasm: transform: remove-useless-xchg', (t) => {
    t.transform('remove-useless-xchg');
    t.end();
});

test('plugin-optimizer-fasm: transform: apply-lodsb', (t) => {
    t.transform('apply-lodsb');
    t.end();
});
