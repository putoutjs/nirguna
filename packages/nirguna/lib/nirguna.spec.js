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
            plugins: [
                'variables/remove-unused',
            ],
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
