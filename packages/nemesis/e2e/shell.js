import {test} from 'supertape';
import {run} from '@nirguna/runner-fasm';
import {getFloppy} from './lib/build.js';

const TIMEOUT = 60_000;
const DEBUG = '2';

await getFloppy({
    debug: DEBUG,
});

const getTrace = async () => {
    const floppy = await getFloppy({
        debug: DEBUG,
    });
    
    return await run(floppy);
};

test('nirguna: nemesis: e2e: kernel starts to execute the shell', async (t) => {
    const trace = await getTrace();
    
    t.match(trace, /^executing\.{3}\n/);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: shell file is found', async (t) => {
    const trace = await getTrace();
    
    t.match(trace, /^found$/m);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: shell is loaded: trace does not stop on a wait for an interrupt', async (t) => {
    const trace = await getTrace();
    const result = trace
        .trimEnd()
        .split('\n')
        .at(-1);
    const expected = 'end';
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});
