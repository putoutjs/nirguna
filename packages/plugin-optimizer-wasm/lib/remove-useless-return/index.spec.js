import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-return', plugin],
    ],
});

test('optimizer-wasm: remove-useless-return: report', (t) => {
    t.report('remove-useless-return', `Avoid useless 'return'`);
    t.end();
});

test('optimizer-wasm: remove-useless-return: transform', (t) => {
    t.transform('remove-useless-return');
    t.end();
});

test('optimizer-wasm: remove-useless-return: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('optimizer-wasm: remove-useless-return: no report: if-no-type', (t) => {
    t.noReport('if-no-type');
    t.end();
});

test('optimizer-wasm: remove-useless-return: no report: not-if', (t) => {
    t.noReport('not-if');
    t.end();
});
