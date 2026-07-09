import {createTest} from '#printer-wasm/test';

const {test} = createTest(import.meta.url);

test('nirguna: printer-wasm: table', (t) => {
    t.transform('table');
    t.end();
});

test('nirguna: printer-wasm: elem', (t) => {
    t.transform('elem');
    t.end();
});

