import {Buffer} from 'node:buffer';
import {test} from 'supertape';
import {isELF} from './elf.js';

test('nirguna: runner-fasm: isELF: elf', (t) => {
    const result = isELF(Buffer.from([
        0x7F,
        0x45,
        0x4C,
        0x46,
        1,
    ]));
    
    t.ok(result);
    t.end();
});

test('nirguna: runner-fasm: isELF: not elf', (t) => {
    const result = isELF(Buffer.from([
        1,
        2,
        3,
        4,
        5,
    ]));
    
    t.notOk(result);
    t.end();
});
