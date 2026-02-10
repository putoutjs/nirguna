import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['switch-cmp-operands', plugin],
    ],
});

test('fasm: switch-cmp-operands: report', (t) => {
    t.report('switch-cmp-operands', `Switch 'cmp' operands`);
    t.end();
});

test('fasm: switch-cmp-operands: transform', (t) => {
    t.transform('switch-cmp-operands');
    t.end();
});
