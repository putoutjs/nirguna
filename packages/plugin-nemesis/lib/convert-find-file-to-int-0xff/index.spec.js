import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-find-file-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-find-file-to-int-0xff: report', (t) => {
    t.report('convert-find-file-to-int-0xff', `Use 'int(0xff)' instead of 'nemesis.findFile()'`);
    t.end();
});

test('nemesis: convert-find-file-to-int-0xff: transform', (t) => {
    t.transform('convert-find-file-to-int-0xff');
    t.end();
});
