import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-cmp-to-test', plugin],
    ],
});

test('optimizer-fasm: convert-cmp-to-test: report', (t) => {
    t.report('convert-cmp-to-test', `Use 'test' instead 'cmp'`);
    t.end();
});

test('optimizer-fasm: convert-cmp-to-test: transform', (t) => {
    t.transform('convert-cmp-to-test');
    t.end();
});
