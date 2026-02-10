import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as convertIfToJmp from '../convert-if-to-jmp/index.js';
import * as applyEquality from '../apply-equality/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-do-while-to-jz', plugin],
    ],
});

test('fasm: convert-do-while-to-jz: report', (t) => {
    t.report('convert-do-while-to-jz', `Use 'jnz' instead of 'do-while'`);
    t.end();
});

test('fasm: convert-do-while-to-jz: transform', (t) => {
    t.transform('convert-do-while-to-jz');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: al', (t) => {
    t.transform('al');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: dec', (t) => {
    t.transform('dec');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: break', (t) => {
    t.transform('break');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: convert-if-to-jmp', (t) => {
    t.transform('convert-if-to-jmp', {
        convertIfToJmp,
    });
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: not', (t) => {
    t.transform('not', {
        convertIfToJmp,
    });
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: continue', (t) => {
    t.transform('continue');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: equal', (t) => {
    t.transform('equal');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: boolean', (t) => {
    t.transform('boolean');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: true', (t) => {
    t.transform('true');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: cmp', (t) => {
    t.transform('cmp');
    t.end();
});

test('fasm: convert-do-while-to-jz: transform: after-if', (t) => {
    t.transform('after-if', {
        applyEquality,
        convertIfToJmp,
    });
    t.end();
});
