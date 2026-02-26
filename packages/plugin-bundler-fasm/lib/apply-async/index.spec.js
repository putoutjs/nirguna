import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-async', plugin],
    ],
});

test('bundler-fasm: apply-async: report', (t) => {
    t.report('apply-async', `Use 'async'`);
    t.end();
});

test('bundler-fasm: apply-async: no report: arrow', (t) => {
    t.noReport('arrow');
    t.end();
});

test('bundler-fasm: apply-async: transform', (t) => {
    t.transform('apply-async');
    t.end();
});

