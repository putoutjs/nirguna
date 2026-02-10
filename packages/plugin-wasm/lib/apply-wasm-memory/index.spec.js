import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-wasm-memory', plugin],
    ],
});

test('wasm: apply-wasm-memory: report', (t) => {
    t.report('apply-wasm-memory', `Use '__nirguna_wasm_memory' instead of 'export const memory'`);
    t.end();
});

test('wasm: apply-wasm-memory: transform', (t) => {
    t.transform('apply-wasm-memory');
    t.end();
});

test('wasm: apply-wasm-memory: transform: no-export', (t) => {
    t.transform('no-export');
    t.end();
});
