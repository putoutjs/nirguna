import {test} from 'supertape';
import {toKey} from './keys.js';

test('nirguna: nemesis: qemu: toKey: enter', (t) => {
    const result = toKey('\n');
    const expected = 'ret';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toKey: space', (t) => {
    const result = toKey(' ');
    const expected = 'spc';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toKey: colon', (t) => {
    const result = toKey(':');
    const expected = 'shift-semicolon';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toKey: at sign', (t) => {
    const result = toKey('@');
    const expected = 'shift-2';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toKey: capital letter', (t) => {
    const result = toKey('A');
    const expected = 'shift-a';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toKey: small letter', (t) => {
    const result = toKey('a');
    const expected = 'a';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: qemu: toKey: digit', (t) => {
    const result = toKey('7');
    const expected = '7';
    
    t.equal(result, expected);
    t.end();
});
