import {test} from 'supertape';
import {lintWastFormatting} from './lint-wast-formatting.js';

test('lint-wast-formatting: double space', (t) => {
    const issues = lintWastFormatting('(func $add (param $a i32)    )');
    
    t.deepEqual(issues, [{
        line: 1,
        column: 26,
        message: 'indent',
    }]);
    t.end();
});

test('lint-wast-formatting: trailing whitespace', (t) => {
    const issues = lintWastFormatting('(block $b \n)');
    
    t.deepEqual(issues, [{
        line: 1,
        column: 10,
        message: 'trailing whitespace',
    }]);
    t.end();
});

test('lint-wast-formatting: consecutive blank lines', (t) => {
    const issues = lintWastFormatting('(module\n\n\n)');
    
    t.deepEqual(issues, [{
        line: 2,
        column: 1,
        message: 'consecutive blank lines',
    }]);
    t.end();
});

test('lint-wast-formatting: clean output has no issues', (t) => {
    const issues = lintWastFormatting('(module\n    (func $x (result i32)\n        (i32.const 1)\n    )\n)\n');
    
    t.deepEqual(issues, []);
    t.end();
});
