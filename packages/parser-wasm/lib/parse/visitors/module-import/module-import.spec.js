import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: module-import', (t) => {
    t.transform('module-import');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: module-import: keeps param names and return type', (t) => {
    t.transform('module-import-typed-params');
    t.end();
});
