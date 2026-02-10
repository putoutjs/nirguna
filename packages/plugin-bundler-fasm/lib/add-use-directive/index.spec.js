import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-use-directive', plugin],
    ],
});

test('bundler-fasm: add-use-directive: report', (t) => {
    t.report('add-use-directive', `Use 'use' directive'`);
    t.end();
});

test('bundler-fasm: add-use-directive: transform', (t) => {
    t.transform('add-use-directive');
    t.end();
});
