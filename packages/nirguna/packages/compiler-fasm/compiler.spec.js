import {Buffer} from 'node:buffer';
import {test} from 'supertape';
import {montag} from 'montag';
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
        ['inflate', {
            last: false,
            places: [],
        }],
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
        ['inflate', {
            last: false,
            places: [],
        }],
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
        ['inflate', {
            last: false,
            places: [],
        }],
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
                    include: () => [
                        'Program',
                    ],
                }],
            ],
        },
    });
    
    const expected = [
        ['inflate', {
            last: false,
            places: [],
        }],
        ['transform', {
            last: true,
            places: [{
                message: 'hello',
                position: {
                    column: 0,
                    line: 1,
                },
                rule: 'report',
            }],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-fasm: assembly', async (t) => {
    const source = 'mov(eax, 1)';
    const [assembly] = await compile(source, {
        type: 'assembly',
    });
    
    const expected = montag`
        xor eax, eax
        inc eax\n
    `;
    
    t.equal(assembly, expected);
    t.end();
});

test('nirguna: compiler-fasm: binary: onStageChanged', async (t) => {
    const source = 'mov(eax, 1)';
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await compile(source, {
        onStageChange,
    });
    
    const expected = [
        ['inflate', {
            last: false,
            places: [],
        }],
        ['transform', {
            last: false,
            places: [],
        }],
        ['optimize', {
            last: false,
            places: [],
        }],
        ['print', {
            last: false,
            places: [],
        }],
        ['translate', {
            last: true,
            places: [],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

const PLAIN = montag`
    function stringLength(str) {
        let n = 0;
        while (str[n])
            n++;
        return n;
    }
`;

const UREG = montag`
    async function stringLength(str): ureg {
        let usi = str;
        let ucx = 0;
        cld();
        while (lodsb()) {
            ++ucx;
        }
        return ucx;
    }
`;

test('nirguna: compiler-fasm: inflate: binary of the plain function', async (t) => {
    const [result] = await compile(PLAIN, {
        target: 'nemesis',
    });
    
    const [expected] = await compile(UREG, {
        target: 'nemesis',
    });
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-fasm: inflate: size of the plain function', async (t) => {
    const [result] = await compile(PLAIN, {
        target: 'nemesis',
    });
    
    t.equal(result.length, 23);
    t.end();
});

test('nirguna: compiler-fasm: inflate: syntax error: places', async (t) => {
    const [, places] = await compile('function {', {
        target: 'nemesis',
    });
    
    t.equal(places.length, 1);
    t.end();
});

test('nirguna: compiler-fasm: inflate: syntax error: onStageChange', async (t) => {
    const result = [];
    const onStageChange = (a, {last, places}) => result.push([a, last, places.length]);
    
    await compile('function {', {
        target: 'nemesis',
        onStageChange,
    });
    
    const expected = [
        ['inflate', true, 1],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

const PLAIN_CLEAR_BUFFER = montag`
    function clearBuffer(buffer) {
        let i = 0;
        while (buffer[i]) {
            buffer[i] = 0;
            i++;
        }
    }
`;

const ASSEMBLY_CLEAR_BUFFER = montag`
    async function clearBuffer(buffer) {
        di = buffer;
        si = buffer;
        while (lodsb()) {
            al = 0;
            stosb();
        }
    }
`;

const PLAIN_STRCMP = montag`
    function strcmp(a, b) {
        let i = 0;
        while (a[i]) {
            if (a[i] !== b[i])
                return 1;
            i++;
        }
        return 0;
    }
`;

const ASSEMBLY_STRCMP = montag`
    async function strcmp(a, b): ureg {
        let uax = 0;
        let usi = a;
        let udi = b;
        cld();
        while (lodsb()) {
            if (al !== [udi]) {
                al = 1;
                break;
            }
            ++udi;
        }
        return uax;
    }
`;

test('nirguna: compiler-fasm: inflate: binary of the plain clear-buffer', async (t) => {
    const [result] = await compile(PLAIN_CLEAR_BUFFER, {
        target: 'nemesis',
    });
    
    const [expected] = await compile(ASSEMBLY_CLEAR_BUFFER, {
        target: 'nemesis',
    });
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-fasm: inflate: binary of the plain strcmp', async (t) => {
    const [result] = await compile(PLAIN_STRCMP, {
        target: 'nemesis',
    });
    
    const [expected] = await compile(ASSEMBLY_STRCMP, {
        target: 'nemesis',
    });
    
    t.deepEqual(result, expected);
    t.end();
});

const PLAIN_HEX_TO_DEC = montag`
    function hex2dec(hex) {
        if (hex >= 0x30 && hex <= 0x39)
            return hex - 0x30;
        if (hex >= 0x41 && hex <= 0x46)
            return hex - 0x37;
        if (hex >= 0x61 && hex <= 0x66)
            return hex - 0x57;
        return 0x10;
    }
`;

const ASSEMBLY_HEX_TO_DEC = montag`
    async function hex2dec(): i8 {
        if (al >= 0x30 && al <= 0x39)
            return al - 0x30;
        if (al >= 0x41 && al <= 0x46)
            return al - 0x37;
        if (al >= 0x61 && al <= 0x66)
            return al - 0x57;
        return 0x10;
    }
`;

const HEX_TO_DEC_BINARY = '3c307c073c397f032c30c33c417c073c467f032c37c33c617c073c667f032c57c3b010c3';

test('nirguna: compiler-fasm: inflate: binary of the plain hex-to-dec', async (t) => {
    const [result] = await compile(PLAIN_HEX_TO_DEC, {
        target: 'nemesis',
    });
    
    const [expected] = await compile(ASSEMBLY_HEX_TO_DEC, {
        target: 'nemesis',
    });
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-fasm: inflate: binary of the plain hex-to-dec: bytes', async (t) => {
    const [binary] = await compile(PLAIN_HEX_TO_DEC, {
        target: 'nemesis',
    });
    
    const result = Buffer
        .from(binary)
        .toString('hex');
    
    t.equal(result, HEX_TO_DEC_BINARY);
    t.end();
});
