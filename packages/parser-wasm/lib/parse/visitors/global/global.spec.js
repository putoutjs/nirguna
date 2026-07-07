import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: global: global-basic', (t) => {
    t.transform('global-basic');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: global: global-immutable', (t) => {
    t.transform('global-immutable');
    t.end();
});

test('nirguna: parser-wasm: parser: visitors: global: global-exported', (t) => {
    t.transform('global-exported');
    t.end();
});

