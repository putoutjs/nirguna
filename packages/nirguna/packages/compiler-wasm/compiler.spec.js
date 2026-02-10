import {test} from 'supertape';
import montag from 'montag';
import {compile} from '#compiler-wasm';

test('nirguna: compiler-wasm', async (t) => {
    const source = montag`
        export function x(a: i32, b: i32): i32 {
            i32.add(local.get(a), local.get(b));
            call('log');
        }
    `;
    
    const [result] = await compile(source, {
        type: 'assembly',
    });
    
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

test('nirguna: compiler-wasm: bios', async (t) => {
    const source = montag`
        data(0, 'Hello World');
    `;
    
    const [result] = await compile(source, {
        type: 'assembly',
    });
    
    const expected = montag`
        (module
            (data (i32.const 0) "Hello World")
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: memory', async (t) => {
    const source = montag`
        import {data} from '#operator-wasm';
        export const memory = [
            'memory',
            1,
        ];
        
        data(i32.const(0), 'Hello World');
        data(i32.const(10), 'ABC');
    `;
    
    const [result] = await compile(source, {
        type: 'assembly',
    });
    
    const expected = montag`
        (module
            (memory (export "memory") 1)
            (data (i32.const 0) "Hello World")
            (data (i32.const 10) "ABC")
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: optimize', async (t) => {
    const source = montag`
        export function thenElse(a: i32): i32 {
            if (i32.eq<i32>(a, 10))
                return i32.const(1);
            else
                return i32.const(5);
        }
    `;
    
    const [result] = await compile(source, {
        type: 'optimized',
    });
    
    const expected = montag`
        export function thenElse(a: i32): i32 {
            if (i32.eq<i32>(local.get(a), i32.const(10)))
                i32.const(1);
            else
                i32.const(5);
        }
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: optimized: onStageChanged', async (t) => {
    const source = 'function add(a, b) {return a + b};\n';
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await compile(source, {
        type: 'optimized',
        optimization: false,
        onStageChange,
    });
    
    const expected = [
        ['transform', {
            last: false,
            places: [],
        }],
        ['optimize', {
            last: true,
            places: [],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
