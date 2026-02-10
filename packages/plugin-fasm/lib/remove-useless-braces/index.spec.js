import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-braces', plugin],
    ],
});

test('fasm: remove-useless-braces: report', (t) => {
    t.report('remove-useless-braces', `Avoid useless braces`);
    t.end();
});

test('fasm: remove-useless-braces: transform', (t) => {
    t.transform('remove-useless-braces');
    t.end();
});
