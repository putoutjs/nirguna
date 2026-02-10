import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-ureg-to-reg', plugin],
    ],
});

test('fasm: convert-ureg-to-reg: report', (t) => {
    t.report('convert-ureg-to-reg', `Use 'reg' instead of 'ureg'`);
    t.end();
});

test('fasm: convert-ureg-to-reg: transform', (t) => {
    t.transform('convert-ureg-to-reg');
    t.end();
});

test('fasm: convert-ureg-to-reg: transform: no-directive', (t) => {
    t.transform('no-directive');
    t.end();
});

test('fasm: convert-ureg-to-reg: transform: no-type', (t) => {
    t.transform('no-type');
    t.end();
});
