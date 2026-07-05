import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: func: basic', (t) => {
    t.transform('func-basic');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: no params', (t) => {
    t.transform('func-no-params');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: return', (t) => {
    t.transform('func-return');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: multiple instructions', (t) => {
    t.transform('func-multiple');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: single param', (t) => {
    t.transform('func-single-param');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: legacy flat form', (t) => {
    t.transform('func-legacy');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: call instruction', (t) => {
    t.transform('func-call');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: comment before', (t) => {
    t.transform('func-comment-before');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: call with no args', (t) => {
    t.transform('func-call-no-args');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: if/else', (t) => {
    t.transform('func-if-else');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: if without else', (t) => {
    t.transform('func-if-no-else');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: not exported', (t) => {
    t.transform('func-not-exported');
    t.end();
});
