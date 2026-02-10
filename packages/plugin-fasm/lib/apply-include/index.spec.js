import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-include', plugin],
    ],
});

test('fasm: apply-include: report', (t) => {
    t.report('apply-include', `Apply 'include'`);
    t.end();
});

test('fasm: apply-include: transform', (t) => {
    t.transform('apply-include');
    t.end();
});

test('fasm: apply-include: transform with options: read-file', (t) => {
    t.transformWithOptions('read-file', {
        readFileSync: () => `const a = 'hello'`,
    });
    t.end();
});
