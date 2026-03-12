import {createTest} from '@putout/test';
import * as convertConstToEqu from '#convert-const-to-equ';
import * as convertAssignToMov from '#convert-assign-to-mov';
import * as plugin from '#split-includes-to-if-sequence';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-includes-to-if-sequence', plugin],
    ],
});

test('fasm: split-includes-to-if-sequence: report', (t) => {
    t.report('split-includes-to-if-sequence', `Use 'if condition' instead of 'includes'`);
    t.end();
});

test('fasm: split-includes-to-if-sequence: transform', (t) => {
    t.transform('split-includes-to-if-sequence');
    t.end();
});

test('fasm: split-includes-to-if-sequence: no report: not-var', (t) => {
    t.noReport('not-var');
    t.end();
});

test('fasm: split-includes-to-if-sequence: transform: convert-const-to-equ', (t) => {
    t.transform('convert-const-to-equ', {
        convertConstToEqu,
    });
    t.end();
});

test('fasm: split-includes-to-if-sequence: no report after transform: convert-assign-to-mov', (t) => {
    t.noReportAfterTransform('convert-assign-to-mov', {
        convertAssignToMov,
    });
    t.end();
});
