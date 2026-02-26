import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['bundler-fasm', fasm],
    ],
});

test('plugin-bundler-fasm: transform: replace-section-code-with-functions', (t) => {
    t.transform('replace-section-code-with-functions');
    t.end();
});

test('plugin-bundler-fasm: transform: replace-section-const-with-equ', (t) => {
    t.transform('replace-section-const-with-equ');
    t.end();
});

test('plugin-bundler-fasm: transform: replace-section-data-with-let', (t) => {
    t.transform('replace-section-data-with-let');
    t.end();
});

test('plugin-bundler-fasm: transform: add-use-directive', (t) => {
    t.transform('add-use-directive');
    t.end();
});

test('plugin-bundler-fasm: transform: apply-debug', (t) => {
    t.transform('apply-debug');
    t.end();
});

test('plugin-bundler-fasm: transform: apply-async', (t) => {
    t.transform('apply-async');
    t.end();
});
