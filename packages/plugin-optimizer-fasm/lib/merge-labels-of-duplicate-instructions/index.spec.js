import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['merge-labels-of-duplicate-instructions', plugin],
    ],
});

test('optimizer-fasm: merge-labels-of-duplicate-instructions: report', (t) => {
    t.report('merge-labels-of-duplicate-instructions', `Use 'if condition' instead of 'ternary expression'`);
    t.end();
});

test('optimizer-fasm: merge-labels-of-duplicate-instructions: transform', (t) => {
    t.transform('merge-labels-of-duplicate-instructions');
    t.end();
});
