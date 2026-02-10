import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-condition', plugin],
    ],
});

test('optimizer-fasm: remove-useless-condition: report', (t) => {
    t.report('remove-useless-condition', `Avoid useless 'or/jnz'`);
    t.end();
});

test('optimizer-fasm: remove-useless-condition: transform', (t) => {
    t.transform('remove-useless-condition');
    t.end();
});

test('optimizer-fasm: remove-useless-condition: no transform: no-prev', (t) => {
    t.noTransform('no-prev');
    t.end();
});

test('optimizer-fasm: remove-useless-condition: no transform: no-jnz', (t) => {
    t.noTransform('no-jnz');
    t.end();
});
