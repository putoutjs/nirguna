import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-gets-to-0xff', plugin],
    ],
});

test('nemesis: convert-gets-to-0xff: report', (t) => {
    t.report('convert-gets-to-0xff', `Use '0xff' instead of 'nemesis.gets()'`);
    t.end();
});

test('nemesis: convert-gets-to-0xff: transform', (t) => {
    t.transform('convert-gets-to-0xff');
    t.end();
});
