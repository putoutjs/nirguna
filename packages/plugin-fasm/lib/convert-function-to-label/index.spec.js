import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as convertReturnToEax from '../convert-return-to-eax/index.js';
import * as convertArgumentsToRegisters from '../convert-args-to-regs/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-function-to-label', plugin],
    ],
});

test('compiler: convert-function-to-label: report', (t) => {
    t.report('convert-function-to-label', `Use 'label' instead of 'function'`);
    t.end();
});

test('compiler: convert-function-to-label: no report: export', (t) => {
    t.noReport('export');
    t.end();
});

test('compiler: convert-function-to-label: transform', (t) => {
    t.transform('convert-function-to-label');
    t.end();
});

test('compiler: convert-function-to-label: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('compiler: convert-function-to-label: transform: no-stack', (t) => {
    t.transform('no-stack');
    t.end();
});

test('compiler: convert-function-to-label: transform: return', (t) => {
    t.transform('return', {
        convertReturnToEax,
    });
    t.end();
});

test('compiler: convert-function-to-label: transform: convert-arguments-to-registers', (t) => {
    t.transform('convert-arguments-to-registers', {
        convertArgumentsToRegisters,
    });
    t.end();
});

test('compiler: convert-function-to-label: transform: convert-return-to-eax', (t) => {
    t.transform('convert-return-to-eax', {
        convertReturnToEax,
    });
    t.end();
});

test('compiler: convert-function-to-label: transform: early-return', (t) => {
    t.transform('early-return');
    t.end();
});

test('compiler: convert-function-to-label: no report: ureg', (t) => {
    t.noReport('ureg');
    t.end();
});

test('compiler: convert-function-to-label: transform: ret', (t) => {
    t.transform('ret');
    t.end();
});
