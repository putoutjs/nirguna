import {test} from 'supertape';
import {shiftBase} from './shift-base.js';

test('nirguna: runner-fasm: shiftBase: capital letter', (t) => {
    const result = shiftBase('A');
    const expected = 'a';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: shiftBase: capital Z', (t) => {
    const result = shiftBase('Z');
    const expected = 'z';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: shiftBase: colon', (t) => {
    const result = shiftBase(':');
    const expected = ';';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: shiftBase: at sign', (t) => {
    const result = shiftBase('@');
    const expected = '2';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: shiftBase: small letter', (t) => {
    const result = shiftBase('a');
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: shiftBase: digit', (t) => {
    const result = shiftBase('7');
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: shiftBase: space', (t) => {
    const result = shiftBase(' ');
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: shiftBase: enter', (t) => {
    const result = shiftBase('\n');
    const expected = '';
    
    t.equal(result, expected);
    t.end();
});
