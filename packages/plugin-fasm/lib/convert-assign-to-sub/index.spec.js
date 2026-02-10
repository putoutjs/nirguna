import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-assign-to-sub', plugin],
    ],
});

test('fasm: convert-assign-to-sub: report', (t) => {
    t.report('convert-assign-to-sub', `Use 'sub' instead of 'assign'`);
    t.end();
});

test('fasm: convert-assign-to-sub: transform', (t) => {
    t.transform('convert-assign-to-sub');
    t.end();
});
