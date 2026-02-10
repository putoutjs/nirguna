import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-linux-write-to-syscall', plugin],
    ],
});

test('fasm: convert-linux-write-to-syscall: report', (t) => {
    t.report('convert-linux-write-to-syscall', `Use 'syscall' instead of 'linux.write()'`);
    t.end();
});

test('fasm: convert-linux-write-to-syscall: transform', (t) => {
    t.transform('convert-linux-write-to-syscall');
    t.end();
});
