import {test} from 'supertape';
import montag from 'montag';
import {compile} from '#nirguna';

test('nirguna: asm', async (t) => {
    const source = 'eax = 1';
    const [result] = await compile(source, {
        target: 'asm',
    });
    
    const expected = montag`
        xor eax, eax
        inc eax\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: asm: config', async (t) => {
    const source = 'const a = 2; eax = 1';
    const [result] = await compile(source, {
        target: 'asm',
        config: {
            plugins: ['variables'],
        },
    });
    
    const expected = montag`
        xor eax, eax
        inc eax
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: wasm: onStageChanged', async (t) => {
    const source = 'function add(a, b) {return a + b};\n';
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await compile(source, {
        type: 'optimized',
        optimization: false,
        onStageChange,
        target: 'wasm',
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

test('nirguna: target: boot', async (t) => {
    const source = montag`
        async function add(a, b) {
            return a + b;
        }
    `;
    
    const [result] = await compile(source, {
        target: 'boot',
        type: 'assembly',
        config: {},
    });
    
    const expected = montag`
       org 0x7c00
       use16
       
       __nirguna_add:
       push bp
       mov bp, sp
       mov ax, [bp + 4]
       add ax, [bp + 6]
       pop bp
       ret 4
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: target: linux', async (t) => {
    const source = montag`
        async function add(a, b) {
            return a + b;
        }
    `;
    
    const [result] = await compile(source, {
        target: 'linux',
        type: 'assembly',
        config: {},
    });
    
    const expected = montag`
       format ELF64 executable
       entry $
       
       __nirguna_add:
       push rbp
       mov rbp, rsp
       mov rax, [rbp + 0x10]
       add rax, [rbp + 0x18]
       pop rbp
       ret 0x10
    
    `;
    
    t.equal(result, expected);
    t.end();
});

test.only('nirguna: target: wasm', async (t) => {
    const source = montag`
        export async function add(a, b) {
            return a + b;
        }
    `;
    
    const [result] = await compile(source, {
        target: 'wasm',
        type: 'assembly',
        config: {},
    });
    
    const expected = montag`
        (module
            (func $add (export "add") (param $a i32) (param $b i32)
                (i32.add (local.get $a) (local.get $b))
            )
        )\n
    `;
    
    t.equal(result, expected);
    t.end();
});
