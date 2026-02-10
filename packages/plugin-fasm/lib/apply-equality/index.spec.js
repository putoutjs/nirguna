import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-equality', plugin],
    ],
});

test('fasm: apply-equality: report', (t) => {
    t.report('apply-equality', `Use '===' and '!==' when comparing with zero`);
    t.end();
});

test('fasm: apply-equality: transform', (t) => {
    t.transform('apply-equality');
    t.end();
});

test('fasm: apply-equality: transform: else', (t) => {
    t.transform('else');
    t.end();
});
