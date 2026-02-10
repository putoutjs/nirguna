import {test} from 'supertape';
import montag from 'montag';
import {print} from '#printer-wasm';

test('nirguna: printer-wasm', (t) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: import', (t) => {
    const source = montag`
        __nirguna_wasm_import('console', 'log', function log(i32) {});
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (import "console" "log" (func $log (param i32)))
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: import: couple args', (t) => {
    const source = montag`
        __nirguna_wasm_import('console', 'log', function log(name: i32, message: f64) {return i32});
        
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (import "console" "log" (func $log (param $name i32) (param $message f64) (result i32)))
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: import: no return', (t) => {
    const source = montag`
         __nirguna_wasm_import('console', 'log', function warn() {
             i32;
         });
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (import "console" "log" (func $warn (result i32)))
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: comments', (t) => {
    const source = montag`
        // example/1.wast.ts
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call(log);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $x (export "x") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
                (call $log)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: function: no export', (t) => {
    const source = montag`
        function add(): i32 {
            local(eax, i32);
            local(ebx, i32);
            local.set(eax, i32.const(1));
            local.set(ebx, i32.const(2));
            i32.add(local.get(eax), local.get(ebx));
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $add (result i32)
                (local $eax i32)
                (local $ebx i32)
                (local.set $eax (i32.const 1))
                (local.set $ebx (i32.const 2))
                (i32.add (local.get $eax) (local.get $ebx))
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: bios', (t) => {
    const source = montag`
        data(i32.const(0), "Hello World");
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (data (i32.const 0) "Hello World")
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: memory', (t) => {
    const source = montag`
        __nirguna_wasm_memory(1);
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (memory 1)
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: memory: export', (t) => {
    const source = montag`
        __nirguna_wasm_memory("memory", 1);
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (memory (export "memory") 1)
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: return', (t) => {
    const source = montag`
        export function thenElse(a: i32): i32 {
            return i32.const(1);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $thenElse (export "thenElse") (param $a i32) (result i32)
                (return (i32.const 1))
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: if', (t) => {
    const source = montag`
        export function thenElse(a: i32): i32 {
            if (i32.eq(local.get(a), i32.const(10)))
                return i32.const(1);
            
            i32.const(0);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $thenElse (export "thenElse") (param $a i32) (result i32)
                (if
                    (i32.eq (local.get $a) (i32.const 10))
                    (then
                        (return (i32.const 1))
                    )
                )
                (i32.const 0)
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: else', (t) => {
    const source = montag`
        export function compare2(a: i32): i32 {
            if (i32.eq(i32.const(10), local.get(a)))
                return i32.const(5);
            else
                return i32.const(10);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $compare2 (export "compare2") (param $a i32) (result i32)
                (if
                    (i32.eq (i32.const 10) (local.get $a))
                    (then
                        (return (i32.const 5))
                    )
                    (else
                        (return (i32.const 10))
                    )
                )
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: else: no return', (t) => {
    const source = montag`
        export function compare2(a: i32): i32 {
            if (i32.eq(i32.const(10), local.get(a)))
                i32.const(5);
            else
                i32.const(10);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $compare2 (export "compare2") (param $a i32) (result i32)
                (if
                    (i32.eq (i32.const 10) (local.get $a))
                    (then
                        (i32.const 5)
                    )
                    (else
                        (i32.const 10)
                    )
                )
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: if: result', (t) => {
    const source = montag`
        export function compare2(a: i32): i32 {
            if (i32.eq<i32>(i32.const(10), local.get(a)))
                i32.const(5);
            else
                i32.const(10);
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $compare2 (export "compare2") (param $a i32) (result i32)
                (if (result i32)
                    (i32.eq (i32.const 10) (local.get $a))
                    (then
                        (i32.const 5)
                    )
                    (else
                        (i32.const 10)
                    )
                )
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: fn: couple', (t) => {
    const source = montag`
        export function compare(eax: i32): i32 {
            i32.eq(local.get(eax), i32.const(0));
        }
        
        export function compare2(eax: i32): i32 {
            i32.eq(local.get(eax), i32.const(0));
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $compare (export "compare") (param $eax i32) (result i32)
                (i32.eq (local.get $eax) (i32.const 0))
            )
            (func $compare2 (export "compare2") (param $eax i32) (result i32)
                (i32.eq (local.get $eax) (i32.const 0))
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: return: empty', (t) => {
    const source = montag`
        export function compare(eax) {
            if (local.get(eax))
                return;
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $compare (export "compare") (param $eax)
                (if
                    (local.get $eax)
                    (then
                        (return)
                    )
                )
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: printer-wasm: i64', (t) => {
    const source = montag`
        export function x(a: i64): i64 {
            local(b, i64);
            local.set(b, i64.const(3));
            i64.add(local.get(a), local.get(b));
        }
    `;
    
    const result = print(source);
    const expected = montag`
        (module
            (func $x (export "x") (param $a i64) (result i64)
                (local $b i64)
                (local.set $b (i64.const 3))
                (i64.add (local.get $a) (local.get $b))
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});
