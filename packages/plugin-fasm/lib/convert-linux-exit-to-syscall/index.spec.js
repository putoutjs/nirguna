import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-linux-exit-to-syscall', plugin],
    ],
});

test('fasm: convert-linux-exit-to-syscall: report', (t) => {
    t.report('convert-linux-exit-to-syscall', `Use 'syscall' instead of 'linux.exit()'`);
    t.end();
});

test('fasm: convert-linux-exit-to-syscall: transform', (t) => {
    t.transform('convert-linux-exit-to-syscall');
    t.end();
});
