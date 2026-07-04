import {test} from 'supertape';
import {montag} from 'montag';
import {parse} from './parser.js';

test('nirguna: wasm → js: function', (t) => {
    const source = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add $a $b)
            )
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(a, b);
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: single param', (t) => {
    const source = montag`
        (module
            (func $id (export "id") (param $a i32) (result i32)
                a
            )
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        export function id(a: i32): i32 {
            a;
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: no params', (t) => {
    const source = montag`
        (module
            (func $fn (export "fn") (result i32)
                (i32.add 1 2)
            )
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        export function fn(): i32 {
            i32.add(1, 2);
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: multiple instructions', (t) => {
    const source = montag`
        (module
            (func $x (export "x") (param $a i32) (result i32)
                (i32.add $a $a)
                a
            )
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        export function x(a: i32): i32 {
            i32.add(a, a);
            a;
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: return', (t) => {
    const source = montag`
        (module
            (func $x (export "x") (param $a i32) (result i32)
                (return (i32.add $a $a))
            )
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        export function x(a: i32): i32 {
            return i32.add(a, a);
        }
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: memory', (t) => {
    const source = montag`
        (module
            (memory 1)
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        memory(1);
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: data', (t) => {
    const source = montag`
        (module
            (data (i32.const 0) "hello")
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        data(i32.const(0), 'hello');
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: import', (t) => {
    const source = montag`
        (module
            (import "console" "log" (func $log (param i32)))
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        __nirguna_wasm_import('console', 'log', function log(i32) {});
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm → js: legacy get_local, flat form', (t) => {
    const source = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (get_local $a)
                (get_local $b)
                (i32.add)
            )
        )
    `;
    
    const result = parse(source);
    
    const expected = montag`
        export function x(a: i32, b: i32): i32 {
            get_local(a);
            get_local(b);
            i32.add();
        }
    `;
    
    t.equal(result, expected);
    t.end();
});
