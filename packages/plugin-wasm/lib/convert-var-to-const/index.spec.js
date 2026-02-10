import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-var-to-const', plugin],
    ],
});

test('wasm: convert-var-to-const: report', (t) => {
    t.report('convert-var-to-const', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('wasm: convert-var-to-const: transform', (t) => {
    t.transform('convert-var-to-const');
    t.end();
});
