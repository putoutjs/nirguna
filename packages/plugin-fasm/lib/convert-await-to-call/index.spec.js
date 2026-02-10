import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-await-to-call', plugin],
    ],
});

test('compiler: convert-await-to-call: report', (t) => {
    t.report('convert-await-to-call', `Use 'call()' operations instead of 'await'`);
    t.end();
});

test('compiler: convert-await-to-call: transform', (t) => {
    t.transform('convert-await-to-call');
    t.end();
});

test('compiler: convert-await-to-call: transform: no-args', (t) => {
    t.transform('no-args');
    t.end();
});

test('compiler: convert-await-to-call: transform: two-args', (t) => {
    t.transform('two-args');
    t.end();
});

test('compiler: convert-await-to-call: transform: one-arg', (t) => {
    t.transform('one-arg');
    t.end();
});

test('compiler: convert-await-to-call: no report: assign', (t) => {
    t.noReport('assign');
    t.end();
});
