import {createTest} from '@putout/test';
import * as removeNestedBlocks from '@putout/plugin-remove-nested-blocks';
import * as splitAssignAwaitWithAssignEax from '../split-assign-await-with-assign-eax/index.js';
import * as convertDoWhileToJnz from '../convert-do-while-to-jnz/index.js';
import * as convertWhileToJz from '../convert-while-to-jz/index.js';
import * as convertFunctionToLabel from '../convert-function-to-label/index.js';
import * as convertIfToJmp from '../convert-if-to-jmp/index.js';
import * as convertReturnToEax from '../convert-return-to-eax/index.js';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['extract-labeled-block', plugin],
    ],
});

test('fasm: extract-labeled-block: report', (t) => {
    t.report('extract-labeled-block', `Extract 'labeled' block: '__nirguna_fasm_if_6'`);
    t.end();
});

test('fasm: extract-labeled-block: transform', (t) => {
    t.transform('extract-labeled-block');
    t.end();
});

test('fasm: extract-labeled-block: no report: nested-labels', (t) => {
    t.noReport('nested-labels');
    t.end();
});

test('fasm: extract-labeled-block: transform: while', (t) => {
    t.transform('while', {
        convertWhileToJz,
        removeNestedBlocks,
    });
    t.end();
});

test('fasm: extract-labeled-block: transform: nested-not-block', (t) => {
    t.transform('nested-not-block', [
        ['convert-if-to-jmp', convertIfToJmp],
        ['convert-return-to-eax', convertReturnToEax],
        ['convert-do-while-to-jnz', convertDoWhileToJnz],
    ]);
    t.end();
});

test('fasm: extract-labeled-block: transform: convert-do-while-to-jnz', (t) => {
    t.transform('convert-do-while-to-jnz', {
        splitAssignAwaitWithAssignEax,
        convertDoWhileToJnz,
        convertFunctionToLabel,
    });
    t.end();
});

test('fasm: extract-labeled-block: no report: nested-labels-inside', (t) => {
    t.noReport('nested-labels-inside');
    t.end();
});
