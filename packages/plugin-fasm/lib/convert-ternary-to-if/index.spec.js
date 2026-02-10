import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-ternary-to-if', plugin],
    ],
});

test('fasm: convert-ternary-to-if: report', (t) => {
    t.report('convert-ternary-to-if', `Use 'if' instead of 'ternary'`);
    t.end();
});

test('fasm: convert-ternary-to-if: transform', (t) => {
    t.transform('convert-ternary-to-if');
    t.end();
});
