import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-binary-to-function', plugin],
    ],
});

test('nirguna: plugin:wasm: convert-binary-to-function: report: convert-binary-to-function', (t) => {
    t.report('convert-binary-to-function', `Convert binary to function`);
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-function: transform: convert-binary-to-function', (t) => {
    t.transform('convert-binary-to-function');
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-function: transform: i64', (t) => {
    t.transform('i64');
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-function: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-function: transform: no report after transform', (t) => {
    t.noReportAfterTransform('convert-binary-to-function');
    t.end();
});

