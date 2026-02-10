import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-jmp', plugin],
    ],
});

test('optimizer-fasm: remove-useless-jmp: report', (t) => {
    t.report('remove-useless-jmp', `Avoid useless 'jmp'`);
    t.end();
});

test('optimizer-fasm: remove-useless-jmp: transform', (t) => {
    t.transform('remove-useless-jmp');
    t.end();
});
