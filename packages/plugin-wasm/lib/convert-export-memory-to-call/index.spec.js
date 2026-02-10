import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-export-memory-to-call', plugin],
    ],
});

test('wasm: convert-export-memory-to-call: report', (t) => {
    t.report('convert-export-memory-to-call', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('wasm: convert-export-memory-to-call: transform', (t) => {
    t.transform('convert-export-memory-to-call');
    t.end();
});
