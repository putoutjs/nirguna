import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-binary-to-call', plugin],
    ],
});

test('nirguna: plugin:wasm: convert-binary-to-call: report: convert-binary-to-call', (t) => {
    t.report('convert-binary-to-call', `Convert binary to call`);
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-call: transform: convert-binary-to-call', (t) => {
    t.transform('convert-binary-to-call');
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-call: transform: i64', (t) => {
    t.transform('i64');
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-call: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-call: transform: not-identifiers', (t) => {
    t.transform('not-identifiers');
    t.end();
});

test('nirguna: plugin:wasm: convert-binary-to-call: transform: no report after transform', (t) => {
    t.noReportAfterTransform('convert-binary-to-call');
    t.end();
});

