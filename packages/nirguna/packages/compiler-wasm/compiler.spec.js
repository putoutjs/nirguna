import {Buffer} from 'node:buffer';
import {test} from 'supertape';
import {montag} from 'montag';
import {run} from '@nirguna/runner-wasm';
import {compile} from '#compiler-wasm';

const noop = () => {};

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

test('nirguna: compiler-wasm: code', async (t) => {
    const source = montag`
        export function x(a: i32): i32 {
            return a;
        }
    `;
    
    const [result] = await compile(source, {
        type: 'code',
    });
    
    const expected = montag`
        export function x(a: i32): i32 {
            return a;
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: code: places', async (t) => {
    const source = 'function add(a, b) {return a + b};\n';
    const [, places] = await compile(source, {
        type: 'code',
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});

test('nirguna: compiler-wasm: code: onStageChange', async (t) => {
    const source = 'function add(a, b) {return a + b};\n';
    const result = [];
    const onStageChange = (a, b) => result.push([a, b]);
    
    await compile(source, {
        type: 'code',
        onStageChange,
    });
    
    const expected = [
        ['inflate', {
            last: false,
            places: [],
        }],
        ['Transform', {
            last: true,
            places: [],
        }],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

const brokenPlugin = {
    report: () => 'broken',
    include: () => [
        'Program',
    ],
    fix: noop,
    filter: () => true,
};

test('nirguna: compiler-wasm: broken plugin: places', async (t) => {
    const source = 'const a = 1;\n';
    const [, places] = await compile(source, {
        type: 'code',
        plugins: [
            ['broken', brokenPlugin],
        ],
    });
    
    t.equal(places.length, 1);
    t.end();
});

test('nirguna: compiler-wasm: broken plugin: onStageChange', async (t) => {
    const source = 'const a = 1;\n';
    const result = [];
    const onStageChange = (a, {last, places}) => result.push([a, last, places.length]);
    
    await compile(source, {
        onStageChange,
        plugins: [
            ['broken', brokenPlugin],
        ],
    });
    const expected = [
        ['inflate', false, 0],
        ['Transform', true, 1],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

const MEMORY = `export const memory = ['memory', 1];`;

const STRING_LENGTH = montag`
    ${MEMORY}
    
    export function getStringLength(str) {
        let n = 0;
        
        while (str[n])
            n++;
        
        return n;
    }
`;

const CLEAR_BUFFER = montag`
    ${MEMORY}
    
    export function clearBuffer(buffer) {
        let i = 0;
        
        while (buffer[i]) {
            buffer[i] = 0;
            i++;
        }
    }
`;

const STRCMP = montag`
    ${MEMORY}
    
    export function strcmp(a, b) {
        let i = 0;
        
        while (a[i]) {
            if (a[i] !== b[i])
                return 1;
            
            i++;
        }
        
        return 0;
    }
`;

const BYTE_READ = 'function first(a) {return a[0];}\n';
const FIRST = 16;
const SECOND = 64;

const instantiate = async (source) => {
    const [binary] = await compile(source);
    
    return run(binary, {});
};

const write = (exports, address, bytes) => {
    new Uint8Array(exports.memory.buffer).set(bytes, address);
};

const read = (exports, address, length) => {
    return Array.from(new Uint8Array(exports.memory.buffer).slice(address, address + length));
};

const toBytes = (a) => [...Buffer.from(a), 0];

const compareStrings = async (a, b) => {
    const exports = await instantiate(STRCMP);
    
    write(exports, FIRST, toBytes(a));
    write(exports, SECOND, toBytes(b));
    
    return exports.strcmp(FIRST, SECOND);
};

test('nirguna: compiler-wasm: inflate: syntax error: places', async (t) => {
    const [, places] = await compile('function {');
    
    t.equal(places.length, 1);
    t.end();
});

test('nirguna: compiler-wasm: inflate: syntax error: onStageChange', async (t) => {
    const result = [];
    const onStageChange = (a, {last, places}) => result.push([a, last, places.length]);
    
    await compile('function {', {
        onStageChange,
    });
    
    const expected = [
        ['inflate', true, 1],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: byte read: places', async (t) => {
    const [, places] = await compile(BYTE_READ);
    
    t.equal(places.length, 1);
    t.end();
});

test('nirguna: compiler-wasm: inflate: byte read: onStageChange', async (t) => {
    const result = [];
    const onStageChange = (a, {last, places}) => result.push([a, last, places.length]);
    
    await compile(BYTE_READ, {
        onStageChange,
    });
    
    const expected = [
        ['inflate', true, 1],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: string-length: abc', async (t) => {
    const exports = await instantiate(STRING_LENGTH);
    
    write(exports, FIRST, toBytes('abc'));
    
    const result = exports.getStringLength(FIRST);
    const expected = 3;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: string-length: empty', async (t) => {
    const exports = await instantiate(STRING_LENGTH);
    
    write(exports, FIRST, toBytes(''));
    
    const result = exports.getStringLength(FIRST);
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: string-length: stops at zero', async (t) => {
    const exports = await instantiate(STRING_LENGTH);
    
    write(exports, FIRST, [0x68, 0, 0x68]);
    
    const result = exports.getStringLength(FIRST);
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: string-length: byte 0xff', async (t) => {
    const exports = await instantiate(STRING_LENGTH);
    
    write(exports, FIRST, [0xff, 0xff, 0]);
    
    const result = exports.getStringLength(FIRST);
    const expected = 2;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: clear-buffer: clears the string', async (t) => {
    const exports = await instantiate(CLEAR_BUFFER);
    
    write(exports, FIRST, [
        1,
        2,
        3,
        0,
        9,
    ]);
    
    exports.clearBuffer(FIRST);
    
    const result = read(exports, FIRST, 5);
    const expected = [
        0,
        0,
        0,
        0,
        9,
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: clear-buffer: empty', async (t) => {
    const exports = await instantiate(CLEAR_BUFFER);
    
    write(exports, FIRST, [0, 9]);
    
    exports.clearBuffer(FIRST);
    
    const result = read(exports, FIRST, 2);
    const expected = [0, 9];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: clear-buffer: byte 0xff', async (t) => {
    const exports = await instantiate(CLEAR_BUFFER);
    
    write(exports, FIRST, [0xff, 0]);
    
    exports.clearBuffer(FIRST);
    
    const result = read(exports, FIRST, 2);
    const expected = [0, 0];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: clear-buffer: returns nothing', async (t) => {
    const exports = await instantiate(CLEAR_BUFFER);
    
    write(exports, FIRST, toBytes('abc'));
    
    const result = exports.clearBuffer(FIRST);
    
    t.notOk(result);
    t.end();
});

test('nirguna: compiler-wasm: inflate: strcmp: equal', async (t) => {
    const result = await compareStrings('help', 'help');
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: strcmp: not equal', async (t) => {
    const result = await compareStrings('help', 'halt');
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: strcmp: empty', async (t) => {
    const result = await compareStrings('', 'help');
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: strcmp: the first string is a prefix', async (t) => {
    const result = await compareStrings('h', 'help');
    const expected = 0;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: compiler-wasm: inflate: strcmp: the second string is a prefix', async (t) => {
    const result = await compareStrings('help', 'h');
    const expected = 1;
    
    t.equal(result, expected);
    t.end();
});
