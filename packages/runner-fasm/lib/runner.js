import * as fasm from 'fasm.js';
import {isELF} from './elf.js';
import {boot} from './boot.js';

export const run = async (binary) => {
    if (isELF(binary))
        return await fasm.run(binary);
    
    return await boot(binary);
};
