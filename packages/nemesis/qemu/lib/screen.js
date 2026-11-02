import {spawn} from 'node:child_process';
import {setTimeout} from 'node:timers/promises';
import {tryToCatch} from 'try-to-catch';
import {toText, toVideo} from './video.js';
import {toKey} from './keys.js';

const isRegExp = (a) => a instanceof RegExp;
const POLL = 500;
const KEY_DELAY = 300;
const SCREEN = 'xp /4000bx 0xb8000\n';

const matches = (until, text) => {
    if (isRegExp(until))
        return until.test(text);
    
    return text.includes(until);
};

const collect = (state, data) => {
    state.output += data;
};

const readScreen = async ({qemu, state}) => {
    state.output = '';
    qemu.stdin.write(SCREEN);
    await setTimeout(POLL);
    
    return toVideo(state.output);
};

const waitFor = async (session, expected) => {
    let video = new Uint8Array();
    
    while (Date.now() < session.deadline) {
        video = await readScreen(session);
        
        if (matches(expected, toText(video)))
            return video;
    }
    
    throw Error(`no match on the screen:\n${toText(video)}`);
};

const pressKeys = async ({qemu}, keys) => {
    for (const key of keys) {
        qemu.stdin.write(`sendkey ${toKey(key)}\n`);
        await setTimeout(KEY_DELAY);
    }
};

const getText = toText;

const getVideo = (video) => ({
    text: toText(video),
    video,
});

const readScreens = async (session, options, read) => {
    const {
        until,
        keys,
        then,
    } = options;
    
    const first = await waitFor(session, until);
    
    if (!keys)
        return read(first);
    
    await pressKeys(session, keys);
    
    return read(await waitFor(session, then));
};

const play = async (image, options, read) => {
    const {timeout = 60_000} = options;
    
    const qemu = spawn('qemu-system-i386', [
        '-drive',
        `file=${image},format=raw,if=floppy`,
        '-display',
        'none',
        '-monitor',
        'stdio',
    ]);
    
    const state = {
        output: '',
    };
    
    const session = {
        qemu,
        state,
        deadline: Date.now() + timeout,
    };
    
    qemu.stdout.on('data', collect.bind(null, state));
    
    const [error, result] = await tryToCatch(readScreens, session, options, read);
    
    qemu.kill();
    
    if (error)
        throw error;
    
    return result;
};

export const screen = (image, options) => play(image, options, getText);
export const screenVideo = (image, options) => play(image, options, getVideo);
