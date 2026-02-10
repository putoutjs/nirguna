import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-get-char-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-get-char-to-int-0xff: report', (t) => {
    t.report('convert-get-char-to-int-0xff', `Use 'int(0xff)' instead of 'nemesis.getChar()'`);
    t.end();
});

test('nemesis: convert-get-char-to-int-0xff: transform', (t) => {
    t.transform('convert-get-char-to-int-0xff');
    t.end();
});
