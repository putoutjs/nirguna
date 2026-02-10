import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-identifier-suffix', plugin],
    ],
});

test('wasm: remove-useless-identifier-suffix: report', (t) => {
    t.report('remove-useless-identifier-suffix', ``);
    t.end();
});

test('wasm: remove-useless-identifier-suffix: transform', (t) => {
    t.transform('remove-useless-identifier-suffix');
    t.end();
});
