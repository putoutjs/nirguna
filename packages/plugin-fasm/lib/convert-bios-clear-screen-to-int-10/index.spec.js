import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-bios-clear-screen-to-int-10', plugin],
    ],
});

test('fasm: convert-bios-clear-screen-to-int-10: report', (t) => {
    t.report('convert-bios-clear-screen-to-int-10', `Use '0x10' instead of 'bios.clearScreen()'`);
    t.end();
});

test('fasm: convert-bios-clear-screen-to-int-10: transform', (t) => {
    t.transform('convert-bios-clear-screen-to-int-10');
    t.end();
});
