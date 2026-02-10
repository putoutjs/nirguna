import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-xchg', plugin],
    ],
});

test('optimizer-fasm: remove-useless-xchg: report', (t) => {
    t.report('remove-useless-xchg', `Avoid useless 'xchg'`);
    t.end();
});

test('optimizer-fasm: remove-useless-xchg: transform', (t) => {
    t.transform('remove-useless-xchg');
    t.end();
});
