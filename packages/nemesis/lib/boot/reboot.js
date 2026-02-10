import {bios} from '@nirguna/operator-fasm';
import {printf} from './printf.js';

let press_any_key = 'press any key';

export async function reboot() {
    await printf(press_any_key);
    
    bios.readChar();
    bios.reboot();
}
