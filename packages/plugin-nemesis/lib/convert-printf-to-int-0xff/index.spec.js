import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-printf-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-printf-to-int-0xff: report', (t) => {
    t.report('convert-printf-to-int-0xff', `Use 'int(0xff)' instead of 'nemesis.printf()'`);
    t.end();
});

test('nemesis: convert-printf-to-int-0xff: transform', (t) => {
    t.transform('convert-printf-to-int-0xff');
    t.end();
});
