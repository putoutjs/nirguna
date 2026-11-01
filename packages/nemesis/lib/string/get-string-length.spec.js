import {test} from 'supertape';
import {getStringLength} from './get-string-length.ts';

const toBytes = (a) => Uint8Array.from([
    ...a,
    0,
]);

test('nirguna: nemesis: get-string-length: empty', (t) => {
    const result = getStringLength(toBytes([]));
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: get-string-length: one byte', (t) => {
    const result = getStringLength(toBytes([0x68]));
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: get-string-length: sh3ll', (t) => {
    const result = getStringLength(toBytes(Buffer.from('SH3LL')));
    const expected = 5;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: get-string-length: byte 0xff', (t) => {
    const result = getStringLength(toBytes([
        0xff,
        0xff,
    ]));
    const expected = 2;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: get-string-length: stops at zero', (t) => {
    const result = getStringLength(Uint8Array.from([
        0x68,
        0,
        0x68,
    ]));
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});
