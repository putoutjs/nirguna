import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: data', (t) => {
    t.transform('data');
    t.end();
});
