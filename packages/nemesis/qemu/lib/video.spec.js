import {test} from 'supertape';
import {montag} from 'montag';
import {toText, toVideo} from './video.js';

const OUTPUT = montag`
    (qemu) xp /16bx 0xb8000
    00000000000b8000: 0x48 0x07 0x69 0x07 0x20 0x07 0x20 0x07
    00000000000b8008: 0x5d 0x14 0x20 0x14 0x00 0x00 0x00 0x00
    (qemu)
`;

test('nirguna: nemesis: qemu: toVideo: bytes', (t) => {
    const result = Array.from(toVideo(OUTPUT));
    const expected = [
        0x48,
        0x07,
        0x69,
        0x07,
        0x20,
        0x07,
        0x20,
        0x07,
        0x5d,
        0x14,
        0x20,
        0x14,
        0,
        0,
        0,
        0,
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toVideo: no rows', (t) => {
    const result = toVideo('(qemu)');
    
    t.equal(result.length, 0);
    t.end();
});

test('nirguna: nemesis: qemu: toText: characters only', (t) => {
    const video = toVideo(OUTPUT);
    const result = toText(video);
    const expected = 'Hi';
    
    t.match(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toText: attributes are not text', (t) => {
    const video = Uint8Array.from([0x41, 0x7f]);
    
    const result = toText(video);
    const expected = 'A';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toText: second line', (t) => {
    const video = new Uint8Array(80 * 2 * 2).fill(0x20);
    
    video[160] = 0x42;
    
    const [, result] = toText(video).split('\n');
    const expected = 'B';
    
    t.equal(result, expected);
    t.end();
});
