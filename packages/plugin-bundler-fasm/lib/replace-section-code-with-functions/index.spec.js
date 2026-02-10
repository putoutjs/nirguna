import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['replace-section-code-with-functions', plugin],
    ],
});

test('bundler-fasm: replace-section-code-with-functions: report', (t) => {
    t.report('replace-section-code-with-functions', `Replace section 'code' with functions`);
    t.end();
});

test('bundler-fasm: replace-section-code-with-functions: transform', (t) => {
    t.transform('replace-section-code-with-functions');
    t.end();
});

test('bundler-fasm: replace-section-code-with-functions: no report: no-section-code', (t) => {
    t.noReport('no-section-code');
    t.end();
});

test('bundler-fasm: replace-section-code-with-functions: transform: arrow', (t) => {
    t.transform('arrow');
    t.end();
});

test('bundler-fasm: replace-section-code-with-functions: no report: start', (t) => {
    t.noReport('start');
    t.end();
});
