import {test} from 'supertape';
import montag from 'montag';
import {transform} from '../lib/transformer.js';

test('nirguna: transformer-wasm', (t) => {
    const source = montag`
        function sum(a: i32, b: i32): i32 {
            i32.add(local.get(), local.get());
        }
        
        export {
            sum,
        };
    `;
    
    const [result] = transform(source);
    const expected = montag`
        export function sum(a: i32, b: i32): i32 {
            i32.add(local.get(), local.get());
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: transformer-wasm: nested', (t) => {
    const source = montag`
        function add(): i32 {
            {
                local(eax, i32);
                local.set(eax, i32.const(1));
            }
            {
                local(ebx, i32);
                local.set(ebx, i32.const(1));
            }
            i32.add(local.get(eax), local.get(eax));
            i32.add(local.get(ebx), local.get(ebx));
        }
    
    `;
    
    const [result] = transform(source);
    const expected = montag`
        function add(): i32 {
            local(eax, i32);
            local(ebx, i32);
            local.set(eax, i32.const(1));
            
            local.set(ebx, i32.const(1));
            
            i32.add(local.get(eax), local.get(eax));
            i32.add(local.get(ebx), local.get(ebx));
        }
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: transformer-wasm: arrow', (t) => {
    const source = montag`
        const sum = (a: i32, b: i32): i32 => {
            i32.add(local.get(), local.get());
        }
        
        export {
            sum,
        };
    `;
    
    const [result] = transform(source);
    const expected = montag`
        export function sum(a: i32, b: i32): i32 {
            i32.add(local.get(), local.get());
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});
