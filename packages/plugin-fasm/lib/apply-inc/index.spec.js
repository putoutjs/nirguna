import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-inc', plugin],
    ],
});

test('fasm: apply-inc: report', (t) => {
    t.report('apply-inc', `Apply increment/decrement`);
    t.end();
});

test('fasm: apply-inc: transform', (t) => {
    t.transform('apply-inc');
    t.end();
});
