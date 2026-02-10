import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-await-to-call', plugin],
    ],
});

test('wasm: convert-await-to-call: report', (t) => {
    t.report('convert-await-to-call', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('wasm: convert-await-to-call: transform', (t) => {
    t.transform('convert-await-to-call');
    t.end();
});
