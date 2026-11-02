import {test} from 'supertape';
import {montag} from 'montag';
import {inflate} from '#inflater-wasm';

const STRING_LENGTH = montag`
    function stringLength(str) {
        let n = 0;
        while (str[n])
            n++;
        return n;
    }
`;

const CLEAR_BUFFER = montag`
    function clearBuffer(buffer) {
        let i = 0;
        while (buffer[i]) {
            buffer[i] = 0;
            i++;
        }
    }
`;

const STRCMP = montag`
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

const HEX_TO_DEC = montag`
    function hexToDec(hex) {
        if (hex >= 0x30 && hex <= 0x39)
            return hex - 0x30;
        if (hex >= 0x41 && hex <= 0x46)
            return hex - 0x37;
        if (hex >= 0x61 && hex <= 0x66)
            return hex - 0x57;
        return 0x10;
    }
`;

const FIRST = 'function first(a) {return a[0];}\n';
const ADD = 'function add(a, b) {return a + b};\n';

test('nirguna: inflater-wasm: inflate: byte read: source', (t) => {
    const [result] = inflate(FIRST);
    const expected = FIRST;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: byte read: message', (t) => {
    const [, [result]] = inflate(FIRST);
    const expected = 'The wasm backend cannot read a byte at an address yet';
    
    t.equal(result.message, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: byte read: line', (t) => {
    const [, [result]] = inflate(FIRST);
    const expected = 1;
    
    t.equal(result.position.line, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: string-length: places', (t) => {
    const [, result] = inflate(STRING_LENGTH);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: string-length: byte read', (t) => {
    const [result] = inflate(STRING_LENGTH);
    
    t.match(result, 'i32.load8_u');
    t.end();
});

test('nirguna: inflater-wasm: inflate: string-length: loop', (t) => {
    const [result] = inflate(STRING_LENGTH);
    
    t.match(result, 'br_if(b');
    t.end();
});

test('nirguna: inflater-wasm: inflate: clear-buffer: places', (t) => {
    const [, result] = inflate(CLEAR_BUFFER);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: clear-buffer: byte write', (t) => {
    const [result] = inflate(CLEAR_BUFFER);
    
    t.match(result, 'i32.store8');
    t.end();
});

test('nirguna: inflater-wasm: inflate: clear-buffer: no result', (t) => {
    const [result] = inflate(CLEAR_BUFFER);
    
    t.match(result, 'function clearBuffer(buffer): []');
    t.end();
});

test('nirguna: inflater-wasm: inflate: strcmp: places', (t) => {
    const [, result] = inflate(STRCMP);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: strcmp: compare', (t) => {
    const [result] = inflate(STRCMP);
    
    t.match(result, 'i32.ne');
    t.end();
});

test('nirguna: inflater-wasm: inflate: hex-to-dec: places', (t) => {
    const [, result] = inflate(HEX_TO_DEC);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: hex-to-dec: comparison', (t) => {
    const [result] = inflate(HEX_TO_DEC);
    
    t.match(result, 'i32.ge_u');
    t.end();
});

test('nirguna: inflater-wasm: inflate: hex-to-dec: no early return', (t) => {
    const [result] = inflate(HEX_TO_DEC);
    
    t.notMatch(result, 'return');
    t.end();
});

test('nirguna: inflater-wasm: inflate: known code: places', (t) => {
    const [, result] = inflate(ADD);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: known code: source', (t) => {
    const [result] = inflate(ADD);
    const expected = ADD;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: syntax error', (t) => {
    const [, [result]] = inflate('function {');
    
    t.match(result.message, 'Unexpected token');
    t.end();
});

test('nirguna: inflater-wasm: inflate: syntax error: line', (t) => {
    const [, [result]] = inflate('function {');
    const expected = 1;
    
    t.equal(result.position.line, expected);
    t.end();
});

test('nirguna: inflater-wasm: inflate: syntax error: source', (t) => {
    const [result] = inflate('function {');
    const expected = 'function {';
    
    t.equal(result, expected);
    t.end();
});
