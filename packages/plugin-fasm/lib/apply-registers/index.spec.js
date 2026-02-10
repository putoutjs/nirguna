import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-registers', plugin],
    ],
});

test('fasm: apply-registers: report', (t) => {
    t.report('apply-registers', `Use registers to address memory`);
    t.end();
});

test('fasm: apply-registers: transform', (t) => {
    t.transform('apply-registers');
    t.end();
});

test('fasm: apply-registers: no report: nested', (t) => {
    t.noReport('nested');
    t.end();
});
