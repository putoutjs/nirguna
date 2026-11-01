import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-byte-read', plugin],
    ],
});

test('wasm: apply-byte-read: transform: string-length', (t) => {
    t.transform('string-length');
    t.end();
});

test('wasm: apply-byte-read: transform: string-length-block', (t) => {
    t.transform('string-length-block');
    t.end();
});

test('wasm: apply-byte-read: transform: clear-buffer', (t) => {
    t.transform('clear-buffer');
    t.end();
});

test('wasm: apply-byte-read: transform: strcmp', (t) => {
    t.transform('strcmp');
    t.end();
});

test('wasm: apply-byte-read: no transform: other', (t) => {
    t.noTransform('other');
    t.end();
});
