import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-mov-to-xor', plugin],
    ],
});

test('optimizer-fasm: convert-mov-to-xor: report', (t) => {
    t.report('convert-mov-to-xor', `Use 'xor' instead of 'mov'`);
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: transform', (t) => {
    t.transform('convert-mov-to-xor');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: transform: ebx', (t) => {
    t.transform('ebx');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: transform: edx', (t) => {
    t.transform('edx');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: report: edx', (t) => {
    t.report('edx', `Use 'cdq' instead of 'mov'`);
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: transform: dx', (t) => {
    t.transform('dx');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: report: dx', (t) => {
    t.report('dx', `Use 'cdq' instead of 'mov'`);
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: no report: addr', (t) => {
    t.noReport('addr');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: no report: ds', (t) => {
    t.noReport('ds');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: no transform: dh', (t) => {
    t.noTransform('dh');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: transform: rax', (t) => {
    t.transform('rax');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: no report: 8-bit', (t) => {
    t.noReport('8-bit');
    t.end();
});

test('optimizer-fasm: convert-mov-to-xor: no report: offset', (t) => {
    t.noReport('offset');
    t.end();
});
