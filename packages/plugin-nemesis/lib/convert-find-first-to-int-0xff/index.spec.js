import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-find-first-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-find-first-to-int-0xff: report', (t) => {
    t.report('convert-find-first-to-int-0xff', `Use '0xff' instead of 'nemesis.findFirst()'`);
    t.end();
});

test('nemesis: convert-find-first-to-int-0xff: transform', (t) => {
    t.transform('convert-find-first-to-int-0xff');
    t.end();
});
