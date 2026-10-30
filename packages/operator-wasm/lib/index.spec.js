import {test} from 'supertape';
import {tryCatch} from 'try-catch';
import {create} from './index.js';

test('nirguna: operator-wast: create: call', (t) => {
    const imports = [];
    const stack = [];
    
    const {call} = create({
        stack,
        imports,
    });
    
    const [error] = tryCatch(call, 'x');
    
    t.equal(error.message, `[call]: 'x' not found`);
    t.end();
});

test('nirguna: operator-wast: create: fn', (t) => {
    const imports = [];
    const stack = [];
    
    const {call} = create({
        stack,
        imports,
    });
    
    const [error] = tryCatch(call, 'x');
    
    t.equal(error.message, `[call]: 'x' not found`);
    t.end();
});

test('nirguna: operator-wast: create: i32.const', (t) => {
    const stack = [];
    const {i32} = create({
        stack,
    });
    
    i32.const(5);
    
    const expected = [5];
    
    t.deepEqual(stack, expected);
    t.end();
});

test('nirguna: operator-wast: create: call: function', (t) => {
    const stack = [];
    const {call} = create({
        stack,
    });
    
    const result = call((a, b) => a + b, 1, 2);
    
    t.equal(result, 3);
    t.end();
});

test('nirguna: operator-wast: create: call: import', (t) => {
    const stack = [];
    const imports = [
        ['console', 'log', (a) => a * 2],
    ];
    
    const {call} = create({
        stack,
        imports,
    });
    
    const result = call('log', 21);
    
    t.equal(result, 42);
    t.end();
});

test('nirguna: operator-wast: create: call: import: skip other names', (t) => {
    const stack = [];
    const imports = [
        ['console', 'warn', null],
        ['console', 'log', () => 2],
    ];
    
    const {call} = create({
        stack,
        imports,
    });
    
    const result = call('log');
    
    t.equal(result, 2);
    t.end();
});

test('nirguna: operator-wast: create: call: import: override', (t) => {
    const stack = [];
    const imports = [
        ['console', 'log', null, () => 2],
    ];
    
    const {call} = create({
        stack,
        imports,
    });
    
    const result = call('log');
    
    t.equal(result, 2);
    t.end();
});

test('nirguna: operator-wast: create: local.get', (t) => {
    const stack = [];
    const {local} = create({
        stack,
    });
    
    local.get(7);
    
    const expected = [7];
    
    t.deepEqual(stack, expected);
    t.end();
});

test('nirguna: operator-wast: create: i32.add', (t) => {
    const stack = [];
    const {i32, local} = create({
        stack,
    });
    
    i32.add(local.get(2), local.get(3));
    
    const expected = [5];
    
    t.deepEqual(stack, expected);
    t.end();
});
