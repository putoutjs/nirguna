import {nemesis} from '@nirguna/operator-nemesis';
import {bios, rb} from '@nirguna/operator-fasm';
import {dir} from './commands/dir.ts';
import {notFound} from './commands/not-found.ts';
import {clearBuffer} from './clear-buffer';
import {strcmp} from '../string/strcmp';
import {setColor} from './commands/set-color';
import {getStringLength} from '../string/get-string-length';

const cmdSize = 80;

let hi = [
    `Hi, I am Sh3ll. Type 'help' for `,
    'more information',
    0xd,
];

let HELP = 'help';
let REBOOT = 'reboot';
let COLOR = 'color';
let CLS = 'cls';
let DIR = 'dir';

let COMMANDS = [
    'Nemesis HELP:',
    0xd,
    'help   - show this screen ;)',
    0xd,
    'dir    - show the files in dir where you now',
    0xd,
    'cls    - will clear the screen',
    0xd,
    'reboot - reboot the computer',
    0xd,
    'color  - change text and background color',
    0xd,
];

let prompt = ']';

async function start() {
    nemesis.printf(hi);
    nemesis.setScreenSize({
        columns: [0, 79],
        lines: [0, 24],
    });
    
    do {
        nemesis.printf(prompt);
        
        await clearBuffer(buffer);
        
        nemesis.gets({
            size: cmdSize,
            buffer,
        });
        
        al = await getStringLength(buffer);
        
        if (!al)
            continue;
        
        await strcmp(buffer, HELP);
        
        if (!al) {
            nemesis.printf(COMMANDS);
            continue;
        }
        
        await strcmp(buffer, REBOOT);
        
        if (!al) {
            bios.reboot();
            continue;
        }
        
        await strcmp(buffer, COLOR);
        
        if (!al) {
            await setColor();
            continue;
        }
        
        await strcmp(buffer, CLS);
        
        if (!al) {
            nemesis.clearScreen();
            continue;
        }
        
        await strcmp(buffer, DIR);
        
        if (!al) {
            await dir();
            continue;
        }
        
        await notFound(buffer);
    } while (true);
}

section: 'code';
section: 'data';
let buffer: rb = cmdSize + 1;
