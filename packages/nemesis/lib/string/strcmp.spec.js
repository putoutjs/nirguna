import {test} from 'supertape';
import {strcmp} from './strcmp.ts';

const toBytes = (a) => Uint8Array.from([...Buffer.from(a), 0]);

test('nirguna: nemesis: strcmp: equal', (t) => {
    const result = strcmp(toBytes('help'), toBytes('help'));
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: strcmp: not equal', (t) => {
    const result = strcmp(toBytes('help'), toBytes('halt'));
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: strcmp: empty', (t) => {
    const result = strcmp(toBytes(''), toBytes('help'));
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: strcmp: the first string is a prefix', (t) => {
    const result = strcmp(toBytes('h'), toBytes('help'));
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: nemesis: strcmp: the second string is a prefix', (t) => {
    const result = strcmp(toBytes('help'), toBytes('h'));
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});
