import {createTest} from '@putout/test';
import * as wastTS from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['wast-ts', wastTS],
    ],
});

test('nirguna: putout-wast: apply-function-declaration', (t) => {
    t.transform('apply-function-declaration');
    t.end();
});
