import {createTest} from '#printer-wasm/test';

const {test} = createTest(import.meta.url);

test('nirguna: printer-wasm', (t) => {
    t.transform('main');
    t.end();
});

test('nirguna: printer-wasm: import', (t) => {
    t.transform('import');
    t.end();
});

test('nirguna: printer-wasm: import: couple args', (t) => {
    t.transform('import-couple-args');
    t.end();
});

test('nirguna: printer-wasm: import: no return', (t) => {
    t.transform('import-no-return');
    t.end();
});

test('nirguna: printer-wasm: comments', (t) => {
    t.transform('comments');
    t.end();
});

test('nirguna: printer-wasm: function: no export', (t) => {
    t.transform('function-no-export');
    t.end();
});

test('nirguna: printer-wasm: function: no export: comment', (t) => {
    t.transform('function-no-export-comment');
    t.end();
});

test('nirguna: printer-wasm: expression: comment', (t) => {
    t.transform('expression-comment');
    t.end();
});

test('nirguna: printer-wasm: bios', (t) => {
    t.transform('bios');
    t.end();
});

test('nirguna: printer-wasm: memory', (t) => {
    t.transform('memory');
    t.end();
});

test('nirguna: printer-wasm: memory: export', (t) => {
    t.transform('memory-export');
    t.end();
});

test('nirguna: printer-wasm: return', (t) => {
    t.transform('return');
    t.end();
});

test('nirguna: printer-wasm: if', (t) => {
    t.transform('if');
    t.end();
});

test('nirguna: printer-wasm: else', (t) => {
    t.transform('else');
    t.end();
});

test('nirguna: printer-wasm: else: no return', (t) => {
    t.transform('else-no-return');
    t.end();
});

test('nirguna: printer-wasm: if: result', (t) => {
    t.transform('if-result');
    t.end();
});

test('nirguna: printer-wasm: fn: couple', (t) => {
    t.transform('fn-couple');
    t.end();
});

test('nirguna: printer-wasm: return: empty', (t) => {
    t.transform('return-empty');
    t.end();
});

test('nirguna: printer-wasm: i64', (t) => {
    t.transform('i64');
    t.end();
});

test('nirguna: printer-wasm: export, no params', (t) => {
    t.transform('export-no-params');
    t.end();
});

test('nirguna: printer-wasm: empty module', (t) => {
    t.transform('empty-module');
    t.end();
});

test('nirguna: printer-wasm: multi-value result', (t) => {
    t.transform('func-multi-value-result');
    t.end();
});

test('nirguna: printer-wasm: global', (t) => {
    t.transform('global-basic');
    t.end();
});

test('nirguna: printer-wasm: float const', (t) => {
    t.transform('func-float-const');
    t.end();
});

test('nirguna: printer-wasm: global: immutable', (t) => {
    t.transform('global-immutable');
    t.end();
});

test('nirguna: printer-wasm: br_if: continue', (t) => {
    t.transform('br-if-continue');
    t.end();
});

test('nirguna: printer-wasm: break: standalone', (t) => {
    t.transform('break-standalone');
    t.end();
});

test('nirguna: printer-wasm: block, loop, br', (t) => {
    t.transform('func-block-loop-br');
    t.end();
});
