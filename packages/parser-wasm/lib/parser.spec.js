import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: wasm → js: function', (t) => {
    t.transform('function');
    t.end();
});

test('nirguna: wasm → js: single-param', (t) => {
    t.transform('single-param');
    t.end();
});

test('nirguna: wasm → js: no-params', (t) => {
    t.transform('no-params');
    t.end();
});

test('nirguna: wasm → js: multiple-instructions', (t) => {
    t.transform('multiple-instructions');
    t.end();
});

test('nirguna: wasm → js: return', (t) => {
    t.transform('return');
    t.end();
});

test('nirguna: wasm → js: memory', (t) => {
    t.transform('memory');
    t.end();
});

test('nirguna: wasm → js: data', (t) => {
    t.transform('data');
    t.end();
});

test('nirguna: wasm → js: import', (t) => {
    t.transform('import');
    t.end();
});

test('nirguna: wasm → js: legacy-get-local', (t) => {
    t.transform('legacy-get-local');
    t.end();
});

test('nirguna: wasm → js: comment-before-start', (t) => {
    t.transform('comment-before-start');
    t.end();
});

test('nirguna: wasm → js: unknown-field', (t) => {
    t.transform('unknown-field');
    t.end();
});
