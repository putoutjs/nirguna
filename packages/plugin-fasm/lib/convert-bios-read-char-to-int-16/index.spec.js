import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-bios-read-char-to-int-16', plugin],
    ],
});

test('fasm: convert-bios-read-char-to-int-16: report', (t) => {
    t.report('convert-bios-read-char-to-int-16', `Use '0x16' instead of 'bios.readChar()'`);
    t.end();
});

test('fasm: convert-bios-read-char-to-int-16: transform', (t) => {
    t.transform('convert-bios-read-char-to-int-16');
    t.end();
});
