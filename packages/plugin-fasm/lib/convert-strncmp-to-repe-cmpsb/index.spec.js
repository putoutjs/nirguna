import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-strncmp-to-repe-cmpsb', plugin],
    ],
});

test('fasm: convert-strncmp-to-repe-cmpsb: report', (t) => {
    t.report('convert-strncmp-to-repe-cmpsb', `Use 'repe.cmbsp()' instead of 'strncmp()'`);
    t.end();
});

test('fasm: convert-strncmp-to-repe-cmpsb: transform', (t) => {
    t.transform('convert-strncmp-to-repe-cmpsb');
    t.end();
});

test('fasm: convert-strncmp-to-repe-cmpsb: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});
