import {createTest} from '@nirguna/test';
import montag from 'montag';
import {run} from '../lib/runner.js';

const {test} = createTest(import.meta.url, {
    target: 'fasm',
    run,
});

test('nirguna: runner-fasm: x64', async ({compile}) => {
    const expected = 'Hello 64-bit world!';
    await compile('x64', expected);
});

test('nirguna: runner-fasm: sum', async ({compile}) => {
    const expected = '3';
    await compile('sum', expected);
});

test('nirguna: runner-fasm: boot', async ({compile}) => {
    const expected = 'Hello World';
    await compile('boot', expected);
});

test('nirguna: runner-fasm: debug', async ({compile}) => {
    const expected = 'hello world\n';
    await compile('debug', expected);
});

test('nirguna: runner-fasm: include', async ({compile}) => {
    const expected = montag`
        begin
        secread: start
        secread: before wait
    
    `;
    
    await compile('include', expected);
});

test('nirguna: runner-fasm: strcmp', async ({compile}) => {
    const expected = 'equal-not equal';
    await compile('strcmp', expected);
});
