import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-label-prefix', plugin],
    ],
});

test('fasm: add-label-prefix: report', (t) => {
    t.report('add-label-prefix', `Add prefix to label: 'add' -> '__nirguna_add'`);
    t.end();
});

test('fasm: add-label-prefix: transform', (t) => {
    t.transform('add-label-prefix');
    t.end();
});

test('fasm: add-label-prefix: transform: member', (t) => {
    t.transform('member');
    t.end();
});

test('fasm: add-label-prefix: transform: duplicate', (t) => {
    t.transform('duplicate');
    t.end();
});

test('fasm: add-label-prefix: transform: rename', (t) => {
    t.transform('rename');
    t.end();
});

test('fasm: add-label-prefix: no report after transform', (t) => {
    t.noReportAfterTransform('add-label-prefix');
    t.end();
});
