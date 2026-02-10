import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-eq', plugin],
    ],
});

test('wasm: apply-eq: report', (t) => {
    t.report('apply-eq', `Use 'i32.eq' instead of '==='`);
    t.end();
});

test('wasm: apply-eq: transform', (t) => {
    t.transform('apply-eq');
    t.end();
});
