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

const getDone = (command) => RegExp(`\\]${command} *\\n([\\s\\S]*\\n)?\\]`);

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
        then: getDone(command),
    });
    
    const cell = findCell(text, `]${command}`) + COLUMNS;
    
    return video[cell * 2 + 1];
};

test('nirguna: nemesis: e2e: color: without arguments prints the help', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color\n',
        then: getDone('color'),
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

test('nirguna: nemesis: e2e: color: small a is 10', async (t) => {
    const result = await getPromptAttribute('color 0a');
    const expected = 0x0a;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: small f is 15', async (t) => {
    const result = await getPromptAttribute('color 0f');
    const expected = 0x0f;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: small a in the background', async (t) => {
    const result = await getPromptAttribute('color a0');
    const expected = 0xa0;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: small b and small f', async (t) => {
    const result = await getPromptAttribute('color bf');
    const expected = 0xbf;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: capital A is 10', async (t) => {
    const result = await getPromptAttribute('color 0A');
    const expected = 0x0a;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: capital F is 15', async (t) => {
    const result = await getPromptAttribute('color 0F');
    const expected = 0x0f;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: capital A in the background', async (t) => {
    const result = await getPromptAttribute('color A0');
    const expected = 0xa0;
    
    t.equal(result, expected);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: small g is not a digit', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color 0g\n',
        then: getDone('color 0g'),
    });
    
    t.match(result, COLOR_HELP);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: capital G is not a digit', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color 0G\n',
        then: getDone('color 0G'),
    });
    
    t.match(result, COLOR_HELP);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: colon is not a digit', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color 0:\n',
        then: getDone('color 0:'),
    });
    
    t.match(result, COLOR_HELP);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: at sign is not a digit', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color 0@\n',
        then: getDone('color 0@'),
    });
    
    t.match(result, COLOR_HELP);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: nemesis: e2e: color: small g in the background is not a digit', async (t) => {
    const result = await screen(await getImage(), {
        until: PROMPT,
        keys: 'color g0\n',
        then: getDone('color g0'),
    });
    
    t.match(result, COLOR_HELP);
    t.end();
}, {
    timeout: TIMEOUT,
});
