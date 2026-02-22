import {createTest} from '@putout/test';
import * as plugin from './index.js';

const target = 'linux';

const test = createTest(import.meta.url, {
    plugins: [
        ['insert-target', plugin],
    ],
});

test('fasm: insert-target: report', (t) => {
    t.reportWithOptions('insert-target', `Insert target: 'linux'`, {
        target: 'linux',
    });
    t.end();
});

test('fasm: insert-target: no report: no-target', (t) => {
    t.noReport('no-target');
    t.end();
});

test('fasm: insert-target: transform with options', (t) => {
    t.transformWithOptions('insert-target', {
        target: 'linux',
    });
    t.end();
});

