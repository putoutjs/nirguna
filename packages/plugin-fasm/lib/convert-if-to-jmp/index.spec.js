import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as convertDoWhileToJnz from '../convert-do-while-to-jnz/index.js';
import * as extractLabeledBlock from '../extract-labeled-block/index.js';
import * as splitStackOperations from '../split-stack-operations/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-if-to-jmp', plugin],
    ],
});

test('fasm: convert-if-to-jmp: report', (t) => {
    t.report('convert-if-to-jmp', `Use 'jmp' instead of 'if'`);
    t.end();
});

test('fasm: convert-if-to-jmp: transform', (t) => {
    t.transform('convert-if-to-jmp');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: equality', (t) => {
    t.transform('equality');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: block', (t) => {
    t.transform('block');
    t.end();
});

test('fasm: convert-if-to-jmp: transform: block-last', (t) => {
    t.transform('block-last');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: block-pop', (t) => {
    t.transform('block-pop');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: not-equal', (t) => {
    t.transform('not-equal');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: no-block', (t) => {
    t.transform('no-block');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: convert-do-while-to-jnz', (t) => {
    t.transform('convert-do-while-to-jnz', {
        convertDoWhileToJnz,
        extractLabeledBlock,
    });
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: label', (t) => {
    t.transform('label');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: more', (t) => {
    t.transform('more');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: less', (t) => {
    t.transform('less');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: else', (t) => {
    t.transform('else');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: no report: unary', (t) => {
    t.noReport('unary');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: split-stack-operations', (t) => {
    t.transform('split-stack-operations', {
        splitStackOperations,
    });
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: and', (t) => {
    t.transform('and');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: or', (t) => {
    t.transform('or');
    t.end();
});

test('nirguna: plugin-fasm: convert-if-to-jmp: transform: less-equal', (t) => {
    t.transform('less-equal');
    t.end();
});
