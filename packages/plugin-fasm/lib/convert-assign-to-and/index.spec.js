import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-assign-to-and', plugin],
    ],
});

test('fasm: convert-assign-to-and: report', (t) => {
    t.report('convert-assign-to-and', `Use 'and(__a, __b)' instead of '__a &= __b'`);
    t.end();
});

test('fasm: convert-assign-to-and: transform', (t) => {
    t.transform('convert-assign-to-and');
    t.end();
});
