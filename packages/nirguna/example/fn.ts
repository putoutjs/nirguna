import {use32} from '#operator-fasm';

use32();

export function add() {
    const eax = 1;
    const ebx = 2;
    return eax + ebx;
}