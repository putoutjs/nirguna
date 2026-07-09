import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: table: table-basic', (t) => {
    t.transform('table-basic');
    t.end();
});
