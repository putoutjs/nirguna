import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: module-export: anonymous func named by export', (t) => {
    t.transform('anonymous-export');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-export: separated export keeps its comment', (t) => {
    t.transform('module-export-separated-with-comment');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-export: comment between func and its own export does not duplicate the export', (t) => {
    t.transform('comment-between-func-and-export');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-export: export declared before func stays a marker', (t) => {
    t.transform('module-export-forward');
    t.end();
});
