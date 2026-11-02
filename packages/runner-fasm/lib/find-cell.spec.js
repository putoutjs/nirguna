import {test} from 'supertape';
import {findCell} from './find-cell.js';

test('nirguna: runner-fasm: findCell: first line', (t) => {
    const result = findCell('Hi\nbye', 'Hi');
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: findCell: second line', (t) => {
    const result = findCell('Hi\nbye', 'bye');
    const expected = 80;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: findCell: column', (t) => {
    const result = findCell('Hi\n  bye', 'bye');
    const expected = 82;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: runner-fasm: findCell: not found', (t) => {
    const result = findCell('Hi', 'bye');
    const expected = -1;
    
    t.equal(result, expected);
    t.end();
});
