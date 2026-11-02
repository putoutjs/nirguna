import {test} from 'supertape';
import {clearBuffer} from './clear-buffer.ts';

test('nirguna: nemesis: clear-buffer: clears the string', (t) => {
    const buffer = Uint8Array.from([
        1,
        2,
        3,
        0,
        9,
    ]);
    
    clearBuffer(buffer);
    
    const expected = Uint8Array.from([
        0,
        0,
        0,
        0,
        9,
    ]);
    
    t.deepEqual(buffer, expected);
    t.end();
});

test('nirguna: nemesis: clear-buffer: empty', (t) => {
    const buffer = Uint8Array.from([0, 9]);
    
    clearBuffer(buffer);
    
    const expected = Uint8Array.from([0, 9]);
    
    t.deepEqual(buffer, expected);
    t.end();
});

test('nirguna: nemesis: clear-buffer: byte 0xff', (t) => {
    const buffer = Uint8Array.from([0xff, 0]);
    
    clearBuffer(buffer);
    
    const expected = Uint8Array.from([0, 0]);
    
    t.deepEqual(buffer, expected);
    t.end();
});
