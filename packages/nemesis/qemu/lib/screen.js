import {spawn} from 'node:child_process';
import {setTimeout} from 'node:timers/promises';

const isRegExp = (a) => a instanceof RegExp;
const POLL = 500;
const KEY_DELAY = 300;
const SCREEN = 'xp /4000bx 0xb8000\n';
const ROW = /^0+b8[\da-f]{3}: (.+)$/gm;
const BYTE = /0x([\da-f]{2})/g;

const KEYS = {
    '\n': 'ret',
    ' ': 'spc',
};

const isCharIndex = (byte, index) => !(index % 2);

const toText = (output) => {
    const bytes = [];
    
    for (const [, row] of output.matchAll(ROW))
        for (const [, byte] of row.matchAll(BYTE))
            bytes.push(parseInt(byte, 16));
    
    const chars = bytes.filter(isCharIndex);
    const lines = [];
    
    for (let i = 0; i < chars.length; i += 80)
        lines.push(
            String
                .fromCharCode(...chars.slice(i, i + 80))
                .trimEnd(),
        );
    
    return lines.join('\n');
};

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
    
    return toText(state.output);
};

const waitFor = async (session, expected) => {
    let text = '';
    
    while (Date.now() < session.deadline) {
        text = await readScreen(session);
        
        if (matches(expected, text))
            return text;
    }
    
    throw Error(`no match on the screen:\n${text}`);
};

const pressKeys = async ({qemu}, keys) => {
    for (const key of keys) {
        qemu.stdin.write(`sendkey ${KEYS[key] || key}\n`);
        await setTimeout(KEY_DELAY);
    }
};

export const screen = async (image, {until, keys, then, timeout = 60_000}) => {
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
    
    try {
        const text = await waitFor(session, until);
        
        if (!keys)
            return text;
        
        await pressKeys(session, keys);
        
        return await waitFor(session, then);
    } finally {
        qemu.kill();
    }
};
