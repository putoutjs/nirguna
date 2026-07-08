import {createTest} from '#printer-wasm/test';

const {test} = createTest(import.meta.url);

test('nirguna: main', (t) => {
    t.transform('main');
    t.end();
});

test('nirguna: printer-wasm: import', (t) => {
    t.transform('import');
    t.end();
});

test('nirguna: printer-wasm: import: import-couple-args', (t) => {
    t.transform('import-couple-args');
    t.end();
});

test('nirguna: printer-wasm: import: import-no-return', (t) => {
    t.transform('import-no-return');
    t.end();
});

test('nirguna: printer-wasm: comments', (t) => {
    t.transform('comments');
    t.end();
});

test('nirguna: printer-wasm: function: function-no-export', (t) => {
    t.transform('function-no-export');
    t.end();
});

test('nirguna: printer-wasm: function: no export: function-no-export-comment', (t) => {
    t.transform('function-no-export-comment');
    t.end();
});

test('nirguna: printer-wasm: expression: expression-comment', (t) => {
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

test('nirguna: printer-wasm: memory: memory-export', (t) => {
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

test('nirguna: printer-wasm: else: else-no-return', (t) => {
    t.transform('else-no-return');
    t.end();
});

test('nirguna: printer-wasm: if: if-result', (t) => {
    t.transform('if-result');
    t.end();
});

test('nirguna: printer-wasm: fn: fn-couple', (t) => {
    t.transform('fn-couple');
    t.end();
});

test('nirguna: printer-wasm: return: return-empty', (t) => {
    t.transform('return-empty');
    t.end();
});

test('nirguna: printer-wasm: i64', (t) => {
    t.transform('i64');
    t.end();
});

test('nirguna: printer-wasm: export-no-params', (t) => {
    t.transform('export-no-params');
    t.end();
});

test('nirguna: printer-wasm: empty-module', (t) => {
    t.transform('empty-module');
    t.end();
});

test('nirguna: printer-wasm: func-multi-value-result', (t) => {
    t.transform('func-multi-value-result');
    t.end();
});

test('nirguna: printer-wasm: global-basic', (t) => {
    t.transform('global-basic');
    t.end();
});

test('nirguna: printer-wasm: func-float-const', (t) => {
    t.transform('func-float-const');
    t.end();
});

test('nirguna: printer-wasm: global: global-immutable', (t) => {
    t.transform('global-immutable');
    t.end();
});

test('nirguna: printer-wasm: transform: block', (t) => {
    t.transform('block');
    t.end();
});

test('nirguna: printer-wasm: transform: loop', (t) => {
    t.transform('loop');
    t.end();
});

test('nirguna: printer-wasm: transform: block-loop', (t) => {
    t.transform('block-loop');
    t.end();
});

test('nirguna: printer-wasm: if: if-else-block', (t) => {
    t.transform('if-else-block');
    t.end();
});

test('nirguna: printer-wasm: export-marker', (t) => {
    t.transform('export-marker');
    t.end();
});

test('nirguna: printer-wasm: global: global-exported', (t) => {
    t.transform('global-exported');
    t.end();
});
