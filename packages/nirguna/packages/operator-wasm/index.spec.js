import {test} from 'supertape';
import {tryCatch} from 'try-catch';
import {create} from '#operator-wasm';

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
