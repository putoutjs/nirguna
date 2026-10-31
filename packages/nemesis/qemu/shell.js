import {writeFileSync, mkdtempSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {test} from 'supertape';
import {pad} from '@nirguna/format-floppy';
import {getFloppy} from '../e2e/lib/build.js';
import {screen} from './lib/screen.js';

const TIMEOUT = 120_000;
const SIZE = 20_480;
const PROMPT = /Hi, I am Sh3ll[\s\S]*\]/;

await getFloppy({
    size: SIZE,
});

const writeImage = async () => {
    const small = await getFloppy({
        size: SIZE,
    });
    
    const image = join(mkdtempSync(join(tmpdir(), 'nemesis-qemu-')), 'nemesis.img');
    
    writeFileSync(image, pad(small));
    
    return image;
};

test('nirguna: nemesis: qemu: shell greets and shows the prompt', async (t) => {
    const image = await writeImage();
    const result = await screen(image, {
        until: PROMPT,
    });
    
    t.match(result, PROMPT);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: qemu: shell answers to help', async (t) => {
    const image = await writeImage();
    const result = await screen(image, {
        until: PROMPT,
        keys: 'help\n',
        then: 'Nemesis HELP:',
    });
    
    t.match(result, 'Nemesis HELP:');
    t.end();
}, {
    timeout: TIMEOUT,
});
