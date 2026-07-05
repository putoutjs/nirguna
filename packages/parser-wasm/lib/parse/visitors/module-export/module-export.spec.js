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
