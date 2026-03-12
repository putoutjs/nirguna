import {nemesis} from '@nirguna/operator-nemesis';
import {bios, rb} from '@nirguna/operator-fasm';
import {ls} from './commands/ls.ts';
import {notFound} from './commands/not-found.ts';
import {clearBuffer} from './clear-buffer';
import {strcmp} from '../string/strcmp';
import {setColor} from './commands/set-color';
import {getStringLength} from '../string/get-string-length';
import {HELP_COMMANDS} from './commands/help';

const cmdSize = 80;

let hi = [`Hi, I am Sh3ll. Type 'help' for `, 'more information', 0xd];

let HELP = 'help';
let REBOOT = 'reboot';
let COLOR = 'color';
let CLS = 'cls';
let LS = 'ls';

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
            nemesis.printf(HELP_COMMANDS);
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
        
        await strcmp(buffer, LS);
        
        if (!al) {
            await ls();
            continue;
        }
        
        await notFound(buffer);
    } while (true);
}

section: 'code';
section: 'data';
let buffer: rb = cmdSize + 1;
