import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-promise', plugin],
    ],
});

test('fasm: remove-useless-promise: report', (t) => {
    t.report('remove-useless-promise', `Avoid useless 'Promise' type`);
    t.end();
});

test('fasm: remove-useless-promise: transform', (t) => {
    t.transform('remove-useless-promise');
    t.end();
});
