import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-bios-read-sector-to-int-13', plugin],
    ],
});

test('fasm: convert-bios-read-sector-to-int-13: report', (t) => {
    t.report('convert-bios-read-sector-to-int-13', `Use '0x13' instead of 'bios.readSector()'`);
    t.end();
});

test('fasm: convert-bios-read-sector-to-int-13: transform', (t) => {
    t.transform('convert-bios-read-sector-to-int-13');
    t.end();
});

test('fasm: convert-bios-read-sector-to-int-13: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('fasm: convert-bios-read-sector-to-int-13: transform: args', (t) => {
    t.transform('args');
    t.end();
});

test('fasm: convert-bios-read-sector-to-int-13: transform: pointer', (t) => {
    t.transform('pointer');
    t.end();
});
