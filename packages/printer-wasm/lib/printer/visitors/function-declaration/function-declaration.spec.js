import {createTest} from '#printer-wasm/test';

const {test} = createTest(import.meta.url);

test('nirguna: printer-wasm: function: func-empty-body', (t) => {
    t.transform('func-empty-body');
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

test('nirguna: printer-wasm: func-multi-value-result', (t) => {
    t.transform('func-multi-value-result');
    t.end();
});

test('nirguna: printer-wasm: func-float-const', (t) => {
    t.transform('func-float-const');
    t.end();
});

test('nirguna: printer-wasm: fn: fn-couple', (t) => {
    t.transform('fn-couple');
    t.end();
});

