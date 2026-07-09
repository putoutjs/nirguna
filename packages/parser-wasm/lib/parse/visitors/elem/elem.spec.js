import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: elem: elem-basic', (t) => {
    t.transform('elem-basic');
    t.end();
});
