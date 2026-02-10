import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as convertArgumentsToRegisters from '../convert-args-to-regs/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-assign-to-mov', plugin],
    ],
});

test('compiler: convert-assign-to-mov: report', (t) => {
    t.report('convert-assign-to-mov', `Use 'mov()' instead of '=' in 'es = ax'`);
    t.end();
});

test('compiler: convert-assign-to-mov: no report: member', (t) => {
    t.noReport('member');
    t.end();
});

test('compiler: convert-assign-to-mov: no report after transform: member', (t) => {
    t.noReportAfterTransform('member');
    t.end();
});

test('compiler: convert-assign-to-mov: transform', (t) => {
    t.transform('convert-assign-to-mov');
    t.end();
});

test('compiler: convert-assign-to-mov: transform: offset', (t) => {
    t.transform('offset');
    t.end();
});

test('compiler: convert-assign-to-mov: transform: args', (t) => {
    t.transform('args', {
        convertArgumentsToRegisters,
    });
    t.end();
});

test('compiler: convert-assign-to-mov: no report: call', (t) => {
    t.noReport('call');
    t.end();
});

test('compiler: convert-assign-to-mov: no report: ptr', (t) => {
    t.noReport('ptr');
    t.end();
});

test('compiler: convert-assign-to-mov: transform: binary', (t) => {
    t.transform('binary');
    t.end();
});
