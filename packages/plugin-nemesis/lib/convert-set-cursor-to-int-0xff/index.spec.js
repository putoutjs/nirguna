import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-set-cursor-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-set-cursor-to-int-0xff: report', (t) => {
    t.report('convert-set-cursor-to-int-0xff', `Use '0xff' instead of 'nemesis.setCursor'`);
    t.end();
});

test('nemesis: convert-set-cursor-to-int-0xff: transform', (t) => {
    t.transform('convert-set-cursor-to-int-0xff');
    t.end();
});
