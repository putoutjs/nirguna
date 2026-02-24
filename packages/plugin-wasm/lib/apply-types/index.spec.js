import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-types', plugin],
    ],
});

test('wasm: apply-types: report', (t) => {
    t.report('apply-types', `Use type: 'i32'`);
    t.end();
});

test('wasm: apply-types: transform', (t) => {
    t.transform('apply-types');
    t.end();
});
