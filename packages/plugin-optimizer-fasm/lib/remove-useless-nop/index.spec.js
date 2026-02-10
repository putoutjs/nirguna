import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-nop', plugin],
    ],
});

test('optimizer-fasm: remove-useless-nop: report', (t) => {
    t.report('remove-useless-nop', `Remove useless 'nop'`);
    t.end();
});

test('optimizer-fasm: remove-useless-nop: transform', (t) => {
    t.transform('remove-useless-nop');
    t.end();
});

test('optimizer-fasm: remove-useless-nop: no report: no-next', (t) => {
    t.noReport('no-next');
    t.end();
});
