import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-clear-screen-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-clear-screen-to-int-0xff: report', (t) => {
    t.report('convert-clear-screen-to-int-0xff', `Use '0xff' instead of 'nemesis.clearScreen()'`);
    t.end();
});

test('nemesis: convert-clear-screen-to-int-0xff: transform', (t) => {
    t.transform('convert-clear-screen-to-int-0xff');
    t.end();
});
