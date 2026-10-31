import {test} from 'supertape';
import {pad} from '@nirguna/format-floppy';
import {screen} from '@nirguna/runner-fasm';
import {getFloppy} from './lib/build.js';

const TIMEOUT = 60_000;
const SIZE = 20_480;
const PROMPT = /Hi, I am Sh3ll[\s\S]*\]/;

await getFloppy({
    size: SIZE,
});

test('nirguna: nemesis: e2e: web: shell greets and shows the prompt', async (t) => {
    const small = await getFloppy({
        size: SIZE,
    });
    
    const result = await screen(pad(small), {
        until: PROMPT,
    });
    
    t.match(result, PROMPT);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: web: shell answers to help', async (t) => {
    const small = await getFloppy({
        size: SIZE,
    });
    
    const result = await screen(pad(small), {
        until: PROMPT,
        keys: 'help\n',
        then: 'Nemesis HELP:',
    });
    
    t.match(result, 'Nemesis HELP:');
    t.end();
}, {
    timeout: TIMEOUT,
});
