import {test} from 'supertape';
import {lint} from './lint.js';

test('lint-wast-formatting: double space', (t) => {
    const result = lint('(func $add (param $a i32)    )');
    const expected = [{
        line: 1,
        column: 26,
        message: 'indent',
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lint-wast-formatting: trailing whitespace', (t) => {
    const result = lint('(block $b \n)');
    const expected = [{
        line: 1,
        column: 10,
        message: 'trailing whitespace',
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lint-wast-formatting: consecutive blank lines', (t) => {
    const result = lint('(module\n\n\n)');
    const expected = [{
        line: 2,
        column: 1,
        message: 'consecutive blank lines',
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('lint-wast-formatting: clean output has no issues', (t) => {
    const result = lint('(module\n    (func $x (result i32)\n        (i32.const 1)\n    )\n)\n');
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
