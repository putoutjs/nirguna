import {test} from 'supertape';
import {hex2dec} from './hex2dec.ts';

test('nirguna: nemesis: hex2dec: before zero', (t) => {
    const result = hex2dec(0x2f);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

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

test('nirguna: nemesis: hex2dec: colon is not a digit', (t) => {
    const result = hex2dec(0x3a);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: at sign is not a digit', (t) => {
    const result = hex2dec(0x40);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: capital A', (t) => {
    const result = hex2dec(0x41);
    const expected = 0xa;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: capital F', (t) => {
    const result = hex2dec(0x46);
    const expected = 0xf;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: capital G is not a digit', (t) => {
    const result = hex2dec(0x47);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: grave accent is not a digit', (t) => {
    const result = hex2dec(0x60);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: small a', (t) => {
    const result = hex2dec(0x61);
    const expected = 0xa;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: small f', (t) => {
    const result = hex2dec(0x66);
    const expected = 0xf;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: small g is not a digit', (t) => {
    const result = hex2dec(0x67);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: above 0x7f', (t) => {
    const result = hex2dec(0x80);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: hex2dec: 0xff', (t) => {
    const result = hex2dec(0xff);
    const expected = 0x10;
    
    t.equal(result, expected);
    t.end();
});
