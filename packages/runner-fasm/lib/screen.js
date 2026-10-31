import {setTimeout} from 'node:timers/promises';
import {createEmulator} from './boot.js';

const POLL = 100;
const KEY_DELAY = 300;
const TIMEOUT = 30_000;

const isString = (a) => typeof a === 'string';
const isRegExp = (a) => a instanceof RegExp;

const getText = (emulator) => emulator.screen_adapter
    .get_text_screen()
    .join('\n');

const matches = (until, text) => {
    if (isString(until))
        return text.includes(until);
    
    if (isRegExp(until))
        return until.test(text);
    
    return until(text);
};

const waitStarted = (emulator) => new Promise((resolve) => {
    emulator.bus.register('emulator-started', resolve);
});

const waitFor = async ({emulator, deadline}, expected) => {
    let text = '';
    
    while (Date.now() < deadline) {
        text = getText(emulator);
        
        if (matches(expected, text))
            return text;
        
        await setTimeout(POLL);
    }
    
    throw Error(`no match on the screen:\n${text}`);
};

const pressKeys = async ({emulator}, keys) => {
    for (const key of keys) {
        emulator.keyboard_send_text(key);
        await setTimeout(KEY_DELAY);
    }
};

export const screen = async (binary, {until, keys, then, timeout = TIMEOUT}) => {
    const emulator = await createEmulator(binary);
    const session = {
        emulator,
        deadline: Date.now() + timeout,
    };
    
    await waitStarted(emulator);
    
    try {
        const text = await waitFor(session, until);
        
        if (!keys)
            return text;
        
        await pressKeys(session, keys);
        
        return await waitFor(session, then);
    } finally {
        emulator.stop();
    }
};
