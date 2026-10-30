import {test} from 'supertape';
import tsParser from './ts-parser.js';

test('nirguna: bundler: ts-parser: name', (t) => {
    const {name} = tsParser();
    
    t.equal(name, 'ts-parser');
    t.end();
});

test('nirguna: bundler: ts-parser: code', (t) => {
    const {transform} = tsParser();
    const {code} = transform('const a = 5;', 'a.ts');
    
    t.equal(code, 'const a = 5;');
    t.end();
});

test('nirguna: bundler: ts-parser: start and end', (t) => {
    const {transform} = tsParser();
    const {ast} = transform('const a = 5;', 'a.ts');
    
    const expected = {
        start: 0,
        end: 12,
    };
    
    const result = {
        start: ast.start,
        end: ast.end,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: bundler: ts-parser: no range: regex', (t) => {
    const {transform} = tsParser();
    const {ast} = transform('const a = /x/g;', 'a.ts');
    const [{declarations}] = ast.body;
    const [{init}] = declarations;
    
    const expected = {
        pattern: 'x',
        flags: 'g',
    };
    
    t.deepEqual(init.regex, expected);
    t.end();
});
