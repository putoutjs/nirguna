import {createTest} from '@putout/test';
import * as fasm from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['optimizer-wasm', fasm],
    ],
});

test('plugin-fasm: remove-useless-return', (t) => {
    t.transform('remove-useless-return');
    t.end();
});
