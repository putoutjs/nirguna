import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-declarations', plugin],
    ],
});

test('putout-wast-ts: remove-useless-declarations: report', (t) => {
    t.report('remove-useless-declarations', `Avoid useless declarations`);
    t.end();
});

test('putout-wast-ts: remove-useless-declarations: transform', (t) => {
    t.transform('remove-useless-declarations');
    t.end();
});

test('putout-wast-ts: remove-useless-declarations: transform: stack', (t) => {
    t.transformCode('const stack = []', '\n');
    t.end();
});

test('putout-wast-ts: remove-useless-declarations: operator-fasm', (t) => {
    t.transformCode('import {use32} from "#operator-fasm"', '\n');
    t.end();
});

test('putout-wast-ts: remove-useless-declarations: operator-fasm: use32', (t) => {
    t.transformCode('use32()', '\n');
    t.end();
});
