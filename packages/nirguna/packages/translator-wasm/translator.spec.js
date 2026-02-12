import {test} from 'supertape';
import {run} from '@nirguna/runner-wasm';
import {translate} from '#translator-wasm';

test('nirguna: translator-wasm: translate', async (t) => {
    const [binary] = await translate(`
        (module
            (func $add (export "add") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
            )
        )
    `);
    
    const {add} = run(binary);
    const result = add(1, 2);
    const expected = 3;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: translator-wasm: translate: places', async (t) => {
    const [, places] = await translate(`
        ((module
            (func $add (export "add") (param $a i32) (param $b i32) (result i32)
                (i32.add (local.get $a) (local.get $b))
            )
        )
    `);
    
    const expected = [{
        message: 'Unexpected token "(", expected a module field or a module.',
        position: {
            column: 10,
            line: 2,
        },
    }];
    
    t.deepEqual(places, expected);
    t.end();
});
