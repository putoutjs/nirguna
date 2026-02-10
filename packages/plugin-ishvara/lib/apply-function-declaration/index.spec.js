import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-function-declaration', plugin],
    ],
});

test('putout-wast-ts: apply-function-declaration: report', (t) => {
    t.report('apply-function-declaration', `Use 'function declaration' instead of 'arrow function expression'`);
    t.end();
});

test('putout-wast-ts: apply-function-declaration: transform', (t) => {
    t.transform('apply-function-declaration');
    t.end();
});

test('putout-wast-ts: apply-function-declaration: transform: type', (t) => {
    t.transform('type');
    t.end();
});
