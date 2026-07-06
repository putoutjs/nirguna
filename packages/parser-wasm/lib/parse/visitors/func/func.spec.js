import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: func: func-basic', (t) => {
    t.transform('func-basic');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-no-params', (t) => {
    t.transform('func-no-params');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-return', (t) => {
    t.transform('func-return');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-multiple', (t) => {
    t.transform('func-multiple');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-single-param', (t) => {
    t.transform('func-single-param');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-legacy', (t) => {
    t.transform('func-legacy');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-call', (t) => {
    t.transform('func-call');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-comment-before', (t) => {
    t.transform('func-comment-before');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-call-no-args', (t) => {
    t.transform('func-call-no-args');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-if-else', (t) => {
    t.transform('func-if-else');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-if-no-else', (t) => {
    t.transform('func-if-no-else');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-not-exported', (t) => {
    t.transform('func-not-exported');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-block-loop-br', (t) => {
    t.transform('func-block-loop-br');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: func: func-export-inline', (t) => {
    t.transform('func-export-inline');
    t.end();
});

