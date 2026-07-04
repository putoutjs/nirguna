import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('nirguna: parser-wasm: parser: visitors: memory', (t) => {
    t.transform('memory');
    t.end();
});

