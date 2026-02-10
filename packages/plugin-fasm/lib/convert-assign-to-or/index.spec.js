import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-assign-to-or', plugin],
    ],
});

test('fasm: convert-assign-to-or: report', (t) => {
    t.report('convert-assign-to-or', `Use 'or' instead of 'assign'`);
    t.end();
});

test('fasm: convert-assign-to-or: transform', (t) => {
    t.transform('convert-assign-to-or');
    t.end();
});
