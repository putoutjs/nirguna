import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-debug-to-printf', plugin],
    ],
});

test('nemesis: convert-debug-to-printf: report', (t) => {
    t.report('convert-debug-to-printf', `Use 'nemesis.printf()' instead of 'debug()'`);
    t.end();
});

test('nemesis: convert-debug-to-printf: transform', (t) => {
    t.transform('convert-debug-to-printf');
    t.end();
});
