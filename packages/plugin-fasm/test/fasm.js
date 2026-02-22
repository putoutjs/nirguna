import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['fasm', fasm],
    ],
});

test('plugin-fasm: convert-assign-to-add', (t) => {
    t.transform('convert-assign-to-add');
    t.end();
});

test('nirguna: convert-nirguna-to-jasm: convert-assign-to-mov', (t) => {
    t.transform('convert-assign-to-mov');
    t.end();
});

test('nirguna: convert-nirguna-to-jasm: convert-assign-to-xor', (t) => {
    t.transform('convert-assign-to-xor');
    t.end();
});

test('nirguna: convert-nirguna-to-jasm: convert-assign-to-shl', (t) => {
    t.transform('convert-assign-to-shl');
    t.end();
});

test('nirguna: convert-nirguna-to-jasm: convert-function-to-label', (t) => {
    t.transform('convert-function-to-label');
    t.end();
});

test('nirguna: convert-nirguna-to-jasm: split-stack-operations', (t) => {
    t.transform('split-stack-operations');
    t.end();
});

test('nirguna: convert-nirguna-to-jasm: convert-await-to-call', (t) => {
    t.transform('convert-await-to-call');
    t.end();
});

test('plugin-fasm: transform: apply-inc', (t) => {
    t.transform('apply-inc');
    t.end();
});

test('plugin-fasm: transform: convert-return-to-eax', (t) => {
    t.transform('convert-return-to-eax');
    t.end();
});

test('plugin-fasm: transform: convert-mov-to-add', (t) => {
    t.transform('convert-mov-to-add');
    t.end();
});

test('plugin-fasm: transform: convert-declaration-to-mov', (t) => {
    t.transform('convert-declaration-to-mov');
    t.end();
});

test('plugin-fasm: transform: add-label-prefix', (t) => {
    t.transform('add-label-prefix');
    t.end();
});

test('plugin-fasm: transform: remove-useless-declarations', (t) => {
    t.transform('remove-useless-declarations');
    t.end();
});

test('plugin-fasm: transform: convert-if-to-jmp', (t) => {
    t.transform('convert-if-to-jmp');
    t.end();
});

test('plugin-fasm: transform: extract-labeled-block', (t) => {
    t.transform('extract-labeled-block');
    t.end();
});

test('plugin-fasm: transform: apply-equality', (t) => {
    t.transform('apply-equality');
    t.end();
});

test('plugin-fasm: transform: convert-assign-to-sub', (t) => {
    t.transform('convert-assign-to-sub');
    t.end();
});

test('plugin-fasm: transform: convert-bios-print-line-to-int-10', (t) => {
    t.transform('convert-bios-print-line-to-int-10');
    t.end();
});

test('plugin-fasm: transform: convert-do-while-to-jnz', (t) => {
    t.transform('convert-do-while-to-jnz');
    t.end();
});

test('plugin-fasm: transform: split-assign-await-with-assign-eax', (t) => {
    t.transform('split-assign-await-with-assign-eax');
    t.end();
});

test('plugin-fasm: transform: convert-bios-scroll-to-int-10', (t) => {
    t.transform('convert-bios-scroll-to-int-10');
    t.end();
});

test('plugin-fasm: transform: convert-bios-read-char-to-int-16', (t) => {
    t.transform('convert-bios-read-char-to-int-16');
    t.end();
});

test('plugin-fasm: transform: convert-bios-read-sector-to-int-13', (t) => {
    t.transform('convert-bios-read-sector-to-int-13');
    t.end();
});

test('plugin-fasm: transform: convert-bios-reboot-to-jmp-far', (t) => {
    t.transform('convert-bios-reboot-to-jmp-far');
    t.end();
});

test('plugin-fasm: transform: convert-strncmp-to-repe-cmpsb', (t) => {
    t.transform('convert-strncmp-to-repe-cmpsb');
    t.end();
});

test('plugin-fasm: transform: convert-ternary-to-if', (t) => {
    t.transform('convert-ternary-to-if');
    t.end();
});

test('plugin-fasm: transform: convert-arguments-to-registers', (t) => {
    t.transform('convert-arguments-to-registers');
    t.end();
});

test('plugin-fasm: transform: apply-types', (t) => {
    t.transform('apply-types');
    t.end();
});

test('plugin-fasm: transform: convert-assign-to-and', (t) => {
    t.transform('convert-assign-to-and');
    t.end();
});

test('plugin-fasm: transform: convert-assign-to-or', (t) => {
    t.transform('convert-assign-to-or');
    t.end();
});

test('plugin-fasm: transform: apply-registers', (t) => {
    t.transform('apply-registers');
    t.end();
});

test('plugin-fasm: transform: remove-useless-braces', (t) => {
    t.transform('remove-useless-braces');
    t.end();
});

test('plugin-fasm: transform: convert-const-to-equ', (t) => {
    t.transform('convert-const-to-equ');
    t.end();
});

test('plugin-fasm: transform: convert-ureg-to-reg', (t) => {
    t.transform('convert-ureg-to-reg');
    t.end();
});

test('plugin-fasm: transform: convert-while-to-jz', (t) => {
    t.transform('convert-while-to-jz');
    t.end();
});

test('plugin-fasm: transform: convert-linux-write-to-syscall', (t) => {
    t.transform('convert-linux-write-to-syscall');
    t.end();
});

test('plugin-fasm: transform: convert-linux-exit-to-syscall', (t) => {
    t.transform('convert-linux-exit-to-syscall');
    t.end();
});

test('plugin-fasm: transform: split-binary-expression', (t) => {
    t.transform('split-binary-expression');
    t.end();
});

test('plugin-fasm: transform: switch-cmp-operands', (t) => {
    t.transform('switch-cmp-operands');
    t.end();
});

test('plugin-fasm: transform: apply-include', (t) => {
    t.transform('apply-include');
    t.end();
});

test('plugin-fasm: transform: remove-useless-promise', (t) => {
    t.transform('remove-useless-promise');
    t.end();
});

test('plugin-fasm: transform: backslash', (t) => {
    t.transform('backslash');
    t.end();
});

test('plugin-fasm: transform: insert-target', (t) => {
    t.transform('insert-target');
    t.end();
});
