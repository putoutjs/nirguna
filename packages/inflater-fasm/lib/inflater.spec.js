import {test} from 'supertape';
import {montag} from 'montag';
import {inflate} from '#inflater-fasm';

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
        if (hex >= 0x30 && hex <= 0x40)
            return hex - 0x30;
        if (hex <= 0x61 || hex >= 0x66)
            return 0x10;
        return hex;
    }
`;

const ASSEMBLY = montag`
    async function getStringLength(str): ureg {
        let usi = str;
        let ucx = 0;
        cld();
        while (lodsb()) {
            ++ucx;
        }
        return ucx;
    }
`;

test('nirguna: inflater-fasm: inflate: string-length', (t) => {
    const [result] = inflate(STRING_LENGTH);
    const expected = montag`
        async function stringLength(str): ureg {
            let usi = str;
            let ucx = 0;
            
            cld();
            while (lodsb()) {
                ++ucx;
            }
            
            return ucx;
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: inflater-fasm: inflate: string-length: places', (t) => {
    const [, result] = inflate(STRING_LENGTH);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: inflater-fasm: inflate: clear-buffer', (t) => {
    const [result] = inflate(CLEAR_BUFFER);
    const expected = montag`
        async function clearBuffer(buffer) {
            di = buffer;
            si = buffer;
            while (lodsb()) {
                al = 0;
                stosb();
            }
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: inflater-fasm: inflate: strcmp', (t) => {
    const [result] = inflate(STRCMP);
    const expected = montag`
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
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: inflater-fasm: inflate: hex-to-dec', (t) => {
    const [result] = inflate(HEX_TO_DEC);
    const expected = montag`
        async function hexToDec(): i8 {
            if (al >= 0x30 && al <= 0x40)
                return al - 0x30;
            
            if (al <= 0x61 || al >= 0x66)
                return 0x10;
            
            return al;
        }\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: inflater-fasm: inflate: hex-to-dec: places', (t) => {
    const [, result] = inflate(HEX_TO_DEC);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: inflater-fasm: inflate: unknown code', (t) => {
    const [result] = inflate(ASSEMBLY);
    const expected = ASSEMBLY;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: inflater-fasm: inflate: syntax error', (t) => {
    const [, [result]] = inflate('function {');
    
    t.match(result.message, 'Unexpected token');
    t.end();
});

test('nirguna: inflater-fasm: inflate: syntax error: line', (t) => {
    const [, [result]] = inflate('function {');
    const expected = 1;
    
    t.equal(result.position.line, expected);
    t.end();
});
