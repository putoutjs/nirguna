import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-mov', plugin],
    ],
});

test('optimizer-fasm: remove-useless-mov: report', (t) => {
    t.report('remove-useless-mov', `Remove useless 'mov'`);
    t.end();
});

test('optimizer-fasm: remove-useless-mov: transform', (t) => {
    t.transform('remove-useless-mov');
    t.end();
});

test('optimizer-fasm: remove-useless-mov: transform: label', (t) => {
    t.transform('label');
    t.end();
});
