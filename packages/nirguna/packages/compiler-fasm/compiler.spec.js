import {test} from 'supertape';
import montag from 'montag';
import {compile} from '#compiler-fasm';

const noop = () => {};

test('nirguna: compiler-fasm: optimized', async (t) => {
    const source = 'mov(eax, 1)';
    const [code] = await compile(source, {
        type: 'optimized',
    });
    
    const expected = montag`
        xor(eax, eax);
        inc(eax);\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('nirguna: compiler-fasm: optimized: no optimization', async (t) => {
    const source = 'mov(eax, 0x1);\n';
    const [code] = await compile(source, {
        type: 'optimized',
        optimization: false,
    });
    
    t.equal(code, source);
    t.end();
});

test('nirguna: compiler-fasm: optimized: onStageChanged', async (t) => {
    const source = 'mov(eax, 0x1);\n';
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

test('nirguna: compiler-fasm: optimized: onStageChanged: error', async (t) => {
    const source = 'mov(eax, 0x1);\n';
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

test('nirguna: compiler-fasm: optimized: onStageChanged: code', async (t) => {
    const source = 'mov(eax, 0x1);\n';
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await compile(source, {
        type: 'code',
        optimization: false,
        onStageChange,
    });
    
    const expected = [
        ['transform', {
            last: true,
            places: [],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-fasm: optimized: onStageChanged: place', async (t) => {
    const source = 'let a = 5\n';
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await compile(source, {
        type: 'code',
        optimization: false,
        onStageChange,
        config: {
            plugins: [
                ['report', {
                    report: () => 'hello',
                    fix: noop,
                    include: () => ['Program'],
                }],
            ],
        },
    });
    
    const expected = [
        ['transform', {
            last: true,
            places: [{
                message: 'hello',
                position: {
                    column: 1,
                    line: 1,
                },
                rule: 'report',
            }],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
