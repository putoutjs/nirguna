import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-set-creen-size-to-0xff', plugin],
    ],
});

test('nemesis: convert-set-creen-size-to-0xff: report', (t) => {
    t.report('convert-set-creen-size-to-0xff', `Use '0xff' instead of 'nemesis.setScreenSize()'`);
    t.end();
});

test('nemesis: convert-set-creen-size-to-0xff: transform', (t) => {
    t.transform('convert-set-creen-size-to-0xff');
    t.end();
});
