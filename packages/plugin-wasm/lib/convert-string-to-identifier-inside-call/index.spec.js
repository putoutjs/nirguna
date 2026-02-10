import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-string-to-identifier-inside-call', plugin],
    ],
});

test('wasm: convert-string-to-identifier-inside-call: report', (t) => {
    t.report('convert-string-to-identifier-inside-call', `Use 'identifier' instead of 'string'`);
    t.end();
});

test('wasm: convert-string-to-identifier-inside-call: transform', (t) => {
    t.transform('convert-string-to-identifier-inside-call');
    t.end();
});
