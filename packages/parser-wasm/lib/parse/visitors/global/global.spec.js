import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: global: global-basic', (t) => {
    t.transform('global-basic');
    t.end();
});
