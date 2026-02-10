import {bios} from '@nirguna/operator-fasm';
import {getStringLength} from '../string/get-string-length.ts';

const GREEN_ON_BLACK = 2;

export async function printf(string) {
    ax = string;
    cx = await getStringLength(ax);
    ax = string;
    bios.printLine(ax, {
        count: cx,
        line: [line],
        color: GREEN_ON_BLACK,
    });
    
    ++dh;
    [line] = dh;
}
