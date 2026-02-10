import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-local-on-top', plugin],
    ],
});

test('wasm: move-local-on-top: report', (t) => {
    t.report('move-local-on-top', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('wasm: move-local-on-top: transform', (t) => {
    t.transform('move-local-on-top');
    t.end();
});
