import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-bios-reboot-to-jmp-far', plugin],
    ],
});

test('fasm: convert-bios-reboot-to-jmp-far: report', (t) => {
    t.report('convert-bios-reboot-to-jmp-far', `Use 'jmp far' instead of 'bios.reboot()'`);
    t.end();
});

test('fasm: convert-bios-reboot-to-jmp-far: transform', (t) => {
    t.transform('convert-bios-reboot-to-jmp-far');
    t.end();
});
