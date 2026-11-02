import {test} from 'supertape';
import {tryToCatch} from 'try-to-catch';
import {screen, screenVideo} from '../lib/screen.js';
import {findCell} from '../lib/find-cell.js';
import {createBoot} from './lib/boot-image.js';

const TIMEOUT = 60_000;

test('nirguna: runner-fasm: screen: until: string', async (t) => {
    const result = await screen(createBoot(), {
        until: 'Hi',
    });
    
    t.match(result, 'Hi');
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screen: until: regexp', async (t) => {
    const result = await screen(createBoot(), {
        until: /^Hi/m,
    });
    
    t.match(result, /^Hi/m);
    t.end();
}, {
    timeout: TIMEOUT,
});

const hasHi = (text) => text.includes('Hi');

test('nirguna: runner-fasm: screen: until: function', async (t) => {
    const result = await screen(createBoot(), {
        until: hasHi,
    });
    
    t.match(result, 'Hi');
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screen: keys', async (t) => {
    const result = await screen(createBoot(), {
        until: 'Hi',
        keys: 'x',
        then: 'Hix',
    });
    
    t.match(result, 'Hix');
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screen: no match', async (t) => {
    const [error] = await tryToCatch(screen, createBoot(), {
        until: 'missing',
        timeout: 1000,
    });
    
    t.match(error.message, 'no match on the screen');
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screenVideo: text', async (t) => {
    const {text} = await screenVideo(createBoot(), {
        until: 'Hi',
    });
    
    t.match(text, 'Hi');
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screenVideo: size', async (t) => {
    const {video} = await screenVideo(createBoot(), {
        until: 'Hi',
    });
    
    t.equal(video.length, 4000);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screenVideo: character', async (t) => {
    const {text, video} = await screenVideo(createBoot(), {
        until: 'Hi',
    });
    
    const cell = findCell(text, 'Hi');
    
    t.equal(video[cell * 2], 0x48);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screenVideo: attribute', async (t) => {
    const {text, video} = await screenVideo(createBoot(), {
        until: 'Hi',
    });
    
    const cell = findCell(text, 'Hi');
    
    t.equal(video[cell * 2 + 1], 0x07);
    t.end();
}, {
    timeout: TIMEOUT,
});

test('nirguna: runner-fasm: screenVideo: keys', async (t) => {
    const {text} = await screenVideo(createBoot(), {
        until: 'Hi',
        keys: 'x',
        then: 'Hix',
    });
    
    t.match(text, 'Hix');
    t.end();
}, {
    timeout: TIMEOUT,
});
