import {createTest} from '@putout/test';
import * as wastTS from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wast-ts', wastTS],
    ],
});

test('nirguna: putout-wast: apply-putout-wasm-import', (t) => {
    t.transform('apply-putout-wasm-import');
    t.end();
});

test('nirguna: putout-wast: convert-var-to-const', (t) => {
    t.transform('convert-var-to-const');
    t.end();
});

test('plugin-wasm: transform: remove-useless-esbuild-suffix', (t) => {
    t.transform('remove-useless-esbuild-suffix');
    t.end();
});

test('plugin-wasm: transform: convert-const-to-local', (t) => {
    t.transform('convert-const-to-local');
    t.end();
});

test('plugin-wasm: transform: move-local-on-top', (t) => {
    t.transform('move-local-on-top');
    t.end();
});

test('plugin-wasm: transform: convert-string-to-identifier-inside-call', (t) => {
    t.transform('convert-string-to-identifier-inside-call');
    t.end();
});

test('plugin-wasm: transform: apply-data-address-type', (t) => {
    t.transform('apply-data-address-type');
    t.end();
});

test('plugin-wasm: transform: convert-export-memory-to-call', (t) => {
    t.transform('convert-export-memory-to-call');
    t.end();
});

test('plugin-wasm: transform: apply-wasm-memory', (t) => {
    t.transform('apply-wasm-memory');
    t.end();
});

test('plugin-wasm: transform: apply-i32-const', (t) => {
    t.transform('apply-i32-const');
    t.end();
});

test('plugin-wasm: transform: apply-eq', (t) => {
    t.transform('apply-eq');
    t.end();
});

test('plugin-wasm: transform: apply-local-get', (t) => {
    t.transform('apply-local-get');
    t.end();
});

test('plugin-wasm: transform: apply-type-to-if', (t) => {
    t.transform('apply-type-to-if');
    t.end();
});

test('plugin-wasm: transform: convert-await-to-call', (t) => {
    t.transform('convert-await-to-call');
    t.end();
});
