import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-type-to-if', plugin],
    ],
});

test('wasm: apply-type-to-if: report', (t) => {
    t.report('apply-type-to-if', `Add type to if condition`);
    t.end();
});

test('wasm: apply-type-to-if: transform', (t) => {
    t.transform('apply-type-to-if');
    t.end();
});
