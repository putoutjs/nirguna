import {test} from 'supertape';
import {
    screen,
    screenVideo,
    findCell,
} from '@nirguna/runner-fasm';
import {pad} from '@nirguna/format-floppy';
import {getFloppy} from './lib/build.js';

const TIMEOUT = 90_000;
const SIZE = 20_480;
const COLUMNS = 80;
const PROMPT = /Hi, I am Sh3ll[\s\S]*\]/;
const COLOR_HELP = `where b - it's bgcolor`;

await getFloppy({
    size: SIZE,
});

const getImage = async () => pad(await getFloppy({
    size: SIZE,
}));

const getPromptAttribute = async (command) => {
    const {text, video} = await screenVideo(await getImage(), {
        until: PROMPT,
        keys: `${command}\n`,
        then: RegExp(`\\]${command} *\\n\\]`),
    });
    
    const cell = findCell(text, `]${command}`) + COLUMNS;
    
    return video[cell * 2 + 1];
};

test('nirguna: nemesis: e2e: color: without arguments prints the help', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color\n',
        then: COLOR_HELP,
    });
    
    t.match(result, COLOR_HELP);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: background 1, text 4', async (t) => {
    const result = await getPromptAttribute('color 14');
    const expected = 0x14;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: text 9', async (t) => {
    const result = await getPromptAttribute('color 09');
    const expected = 0x09;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: background 3, text 0', async (t) => {
    const result = await getPromptAttribute('color 30');
    const expected = 0x30;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: small a is not a digit (F-11)', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color 0a\n',
        then: COLOR_HELP,
    });
    
    t.match(result, COLOR_HELP);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: small b is not converted (F-11)', async (t) => {
    const result = await getPromptAttribute('color 0b');
    const expected = 0x62;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});
