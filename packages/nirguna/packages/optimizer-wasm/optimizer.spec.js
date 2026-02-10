import {test} from 'supertape';
import montag from 'montag';
import {optimize} from '#optimizer-wasm';

test('nirguna: optimizer-wasm', (t) => {
    const [code] = optimize(`
        export function thenElse(a: i32): i32 {
            if (i32.eq<i32>(a, 10))
                return i32.const(1);
            else
                return i32.const(5);
        }
    `);
    
    const expected = montag`
        export function thenElse(a: i32): i32 {
            if (i32.eq<i32>(a, 10))
                i32.const(1);
            else
                i32.const(5);
        }\n
    `;
    
    t.equal(code, expected);
    t.end();
});
