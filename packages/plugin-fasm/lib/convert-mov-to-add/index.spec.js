import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-mov-to-add', plugin],
    ],
});

test('fasm: convert-mov-to-add: report', (t) => {
    t.report('convert-mov-to-add', `Use 'add' instead of 'mov'`);
    t.end();
});

test('fasm: convert-mov-to-add: transform', (t) => {
    t.transform('convert-mov-to-add');
    t.end();
});
