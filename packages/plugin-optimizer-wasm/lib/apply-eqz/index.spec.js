import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-eqz', plugin],
    ],
});

test('optimizer-wasm: apply-eqz: report', (t) => {
    t.report('apply-eqz', `Use 'i32.eqz()' instead of 'i32.eq'`);
    t.end();
});

test('optimizer-wasm: apply-eqz: transform', (t) => {
    t.transform('apply-eqz');
    t.end();
});
