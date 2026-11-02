import {setTimeout} from 'node:timers/promises';
import {tryToCatch} from 'try-to-catch';
import {createEmulator} from './boot.js';
import {waitStarted} from './wait-started.js';
import {shiftBase} from './shift-base.js';

const POLL = 100;
const KEY_DELAY = 300;
const SHIFT_DELAY = 100;
const SHIFT_DOWN = 0x2a;
const SHIFT_UP = 0xaa;
const TIMEOUT = 30_000;
const VIDEO_SIZE = 4000;

const isString = (a) => typeof a === 'string';
const isRegExp = (a) => a instanceof RegExp;

const readText = (emulator) => emulator.screen_adapter
    .get_text_screen()
    .join('\n');

const matches = (until, text) => {
    if (isString(until))
        return text.includes(until);
    
    if (isRegExp(until))
        return until.test(text);
    
    return until(text);
};

const waitFor = async ({emulator, deadline}, expected) => {
    let text = '';
    
    while (Date.now() < deadline) {
        text = readText(emulator);
        
        if (matches(expected, text))
            return text;
        
        await setTimeout(POLL);
    }
    
    throw Error(`no match on the screen:\n${text}`);
};

const pressShifted = async (emulator, base) => {
    await emulator.keyboard_send_scancodes([SHIFT_DOWN], SHIFT_DELAY);
    emulator.keyboard_send_text(base);
    await setTimeout(SHIFT_DELAY);
    await emulator.keyboard_send_scancodes([SHIFT_UP], SHIFT_DELAY);
};

const pressKey = async (emulator, key) => {
    const base = shiftBase(key);
    
    if (base)
        return await pressShifted(emulator, base);
    
    emulator.keyboard_send_text(key);
};

const pressKeys = async ({emulator}, keys) => {
    for (const key of keys) {
        await pressKey(emulator, key);
        await setTimeout(KEY_DELAY);
    }
};

const getText = ({text}) => text;

const getVideo = ({text, emulator}) => ({
    text,
    video: emulator.v86.cpu.devices.vga.vga_memory.slice(0, VIDEO_SIZE),
});

const readScreens = async (session, options, read) => {
    const {emulator} = session;
    const {
        until,
        keys,
        then,
    } = options;
    
    await waitStarted(session);
    
    const first = await waitFor(session, until);
    
    if (!keys)
        return read({
            text: first,
            emulator,
        });
    
    await pressKeys(session, keys);
    
    const text = await waitFor(session, then);
    
    return read({
        text,
        emulator,
    });
};

const play = async (binary, options, read) => {
    const {timeout = TIMEOUT} = options;
    const emulator = await createEmulator(binary);
    
    const session = {
        emulator,
        deadline: Date.now() + timeout,
    };
    
    const [error, result] = await tryToCatch(readScreens, session, options, read);
    
    emulator.stop();
    
    if (error)
        throw error;
    
    return result;
};

export const screen = (binary, options) => play(binary, options, getText);
export const screenVideo = (binary, options) => play(binary, options, getVideo);
