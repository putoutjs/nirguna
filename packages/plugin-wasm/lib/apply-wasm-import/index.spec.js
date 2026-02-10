import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-putout-wast-import', plugin],
    ],
});

test('wasm: apply-putout-wasm-import: report', (t) => {
    t.report('apply-putout-wasm-import', `Use '__nirguna_wasm_import()'`);
    t.end();
});

test('wasm: apply-putout-wast-import: transform: apply-putout-wasm-import', (t) => {
    t.transform('apply-putout-wasm-import');
    t.end();
});
