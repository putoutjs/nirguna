import {createTest} from '@nirguna/test';
import {run} from './runner.js';

const {test} = createTest(import.meta.url, {
    run,
    target: 'wasm',
});

test('nirguna: runner-wasm: sum', async ({compile}) => {
    const expected = 3n;
    await compile('sum', expected, 'entry', [1n, 2n]);
});

test('nirguna: runner-wasm: log', async ({compile}) => {
    const expected = '3';
    await compile('log', expected, 'entry', [1, 2]);
});

test('nirguna: runner-wasm: variables', async ({compile}) => {
    const expected = 3;
    await compile('variables', expected, 'entry', [1, 2]);
});

test('nirguna: runner-wasm: local-set', async ({compile}) => {
    const expected = 7n;
    await compile('local-set', expected, 'entry');
});
