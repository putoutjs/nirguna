import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-while-to-jz', plugin],
    ],
});

test('fasm: convert-while-to-jz: report', (t) => {
    t.report('convert-while-to-jz', `Use 'jz' instead of 'while'`);
    t.end();
});

test('fasm: convert-while-to-jz: transform', (t) => {
    t.transform('convert-while-to-jz');
    t.end();
});

test('fasm: convert-while-to-jz: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('fasm: convert-while-to-jz: transform: binary', (t) => {
    t.transform('binary');
    t.end();
});

test('fasm: convert-while-to-jz: transform: lodsb', (t) => {
    t.transform('lodsb');
    t.end();
});

test('fasm: convert-while-to-jz: transform: break', (t) => {
    t.transform('break');
    t.end();
});

test('fasm: convert-while-to-jz: transform: no-body', (t) => {
    t.transform('no-body');
    t.end();
});
