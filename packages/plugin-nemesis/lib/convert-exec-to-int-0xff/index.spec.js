import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-exec-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-exec-to-int-0xff: report', (t) => {
    t.report('convert-exec-to-int-0xff', `Use 'int(0xff)' instead of 'nemesis.exec()'`);
    t.end();
});

test('nemesis: convert-exec-to-int-0xff: transform', (t) => {
    t.transform('convert-exec-to-int-0xff');
    t.end();
});
