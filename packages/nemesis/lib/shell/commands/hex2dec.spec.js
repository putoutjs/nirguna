import {test} from 'supertape';
import {hex2dec} from './hex2dec.ts';

test('nirguna: nemesis: hex2dec: zero', (t) => {
    const result = hex2dec(0x30);
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: nine', (t) => {
    const result = hex2dec(0x39);
    const expected = 9;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: 0x3f', (t) => {
    const result = hex2dec(0x3f);
    const expected = 15;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: 0x40 is accepted', (t) => {
    const result = hex2dec(0x40);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: below the range', (t) => {
    const result = hex2dec(0x2f);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: capital a', (t) => {
    const result = hex2dec(0x41);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: small a is not a digit', (t) => {
    const result = hex2dec(0x61);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: small b is not converted', (t) => {
    const result = hex2dec(0x62);
    const expected = 0x62;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: small e is not converted', (t) => {
    const result = hex2dec(0x65);
    const expected = 0x65;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: small f is not a digit', (t) => {
    const result = hex2dec(0x66);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: byte 0x80', (t) => {
    const result = hex2dec(0x80);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: byte 0xff', (t) => {
    const result = hex2dec(0xff);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});
