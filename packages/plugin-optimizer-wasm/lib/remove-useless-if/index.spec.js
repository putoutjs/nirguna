import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-if', plugin],
    ],
});

test('optimizer-wasm: remove-useless-if: report', (t) => {
    t.report('remove-useless-if', `Avoid useless 'if condition'`);
    t.end();
});

test('optimizer-wasm: remove-useless-if: transform', (t) => {
    t.transform('remove-useless-if');
    t.end();
});

test('optimizer-wasm: remove-useless-if: transform: local', (t) => {
    t.transform('local');
    t.end();
});
