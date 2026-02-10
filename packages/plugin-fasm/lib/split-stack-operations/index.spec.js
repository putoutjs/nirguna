import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['split-stack-operations', plugin],
    ],
});

test('compiler: split-stack-operations: report', (t) => {
    t.report('split-stack-operations', `Split 'push(__array)' to couple calls`);
    t.end();
});

test('compiler: split-stack-operations: transform', (t) => {
    t.transform('split-stack-operations');
    t.end();
});

test('compiler: split-stack-operations: transform: label', (t) => {
    t.transform('label');
    t.end();
});
