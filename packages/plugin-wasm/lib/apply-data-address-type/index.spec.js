import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-data-address-type', plugin],
    ],
});

test('wasm: apply-bios-address-type: report: apply-data-address-type', (t) => {
    t.report('apply-data-address-type', `Apply data address type`);
    t.end();
});

test('wasm: apply-bios-address-type: transform: apply-data-address-type', (t) => {
    t.transform('apply-data-address-type');
    t.end();
});
