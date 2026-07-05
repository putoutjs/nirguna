import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: module-export: anonymous-export', (t) => {
    t.transform('anonymous-export');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-export: module-export-separated-with-comment', (t) => {
    t.transform('module-export-separated-with-comment');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-export: comment-between-func-and-export', (t) => {
    t.transform('comment-between-func-and-export');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-export: module-export-forward', (t) => {
    t.transform('module-export-forward');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-export: module-export-invalid', (t) => {
    t.transform('module-export-invalid');
    t.end();
});

