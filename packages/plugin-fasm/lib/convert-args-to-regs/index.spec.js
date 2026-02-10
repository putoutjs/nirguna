import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as applyRegisters from '../apply-registers/index.js';
import * as removeUselessBraces from '../remove-useless-braces/index.js';
import * as convertFunctionToLabel from '../convert-function-to-label/index.js';
import * as convertPrintLineToInt10 from '../convert-bios-print-line-to-int-10/index.js';
import * as convertReturnToEax from '../convert-return-to-eax/index.js';
import * as convertUregToReg from '../convert-ureg-to-reg/index.js';
import * as convertAssignToMov from '../convert-assign-to-mov/index.js';
import * as convertDeclarationToMov from '../convert-declaration-to-mov/index.js';
import * as convertWhileToJz from '../convert-while-to-jz/index.js';
import * as splitBinaryExpression from '../split-binary-expression/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-args-to-regs', plugin],
    ],
});

test('fasm: convert-args-to-regs: report: convert-arguments-to-registers', (t) => {
    t.report('convert-arguments-to-registers', `Use 'regs' instead of 'args'`);
    t.end();
});

test('fasm: convert-args-to-regs: transform: convert-arguments-to-registers', (t) => {
    t.transform('convert-arguments-to-registers', {
        removeUselessBraces,
        applyRegisters,
    });
    t.end();
});

test('fasm: convert-args-to-regs: transform: return', (t) => {
    t.transform('return', {
        convertFunctionToLabel,
    });
    t.end();
});

test('fasm: convert-args-to-regs: transform: early-return', (t) => {
    t.transform('early-return', {
        convertFunctionToLabel,
        convertPrintLineToInt10,
        convertReturnToEax,
    });
    t.end();
});

test('fasm: convert-args-to-regs: no report: ureg', (t) => {
    t.noReport('ureg');
    t.end();
});

test('fasm: convert-args-to-regs: transform: 32-bit', (t) => {
    t.transform('32-bit');
    t.end();
});

test('fasm: convert-args-to-regs: transform: assign', (t) => {
    t.transform('assign', {
        convertUregToReg,
        convertAssignToMov,
        convertDeclarationToMov,
    });
    t.end();
});

test('fasm: convert-args-to-regs: transform: couple', (t) => {
    t.transform('couple', {
        splitBinaryExpression,
    });
    t.end();
});

test('fasm: convert-args-to-regs: transform: while', (t) => {
    t.transform('while', {
        convertAssignToMov,
        convertDeclarationToMov,
        convertUregToReg,
        convertWhileToJz,
    });
    t.end();
});

test('fasm: convert-args-to-regs: transform: label', (t) => {
    t.transform('label', {
        convertAssignToMov,
        convertDeclarationToMov,
        convertUregToReg,
        convertWhileToJz,
    });
    t.end();
});

test('fasm: convert-args-to-regs: transform: ret', (t) => {
    t.transform('ret');
    t.end();
});
