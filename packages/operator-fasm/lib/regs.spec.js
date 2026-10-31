import {test} from 'supertape';
import {
    is8bit,
    is16bit,
    is32bit,
    is64bit,
    isRegister,
} from './regs.js';

test('nirguna: operator-fasm: regs: isRegister', (t) => {
    const result = isRegister('eax');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: segment', (t) => {
    const result = isRegister('ds');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: not a register', (t) => {
    const result = isRegister('hello');
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is8bit', (t) => {
    const result = is8bit('al');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is8bit: wide register', (t) => {
    const result = is8bit('ax');
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is16bit', (t) => {
    const result = is16bit('ax');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is16bit: wide register', (t) => {
    const result = is16bit('eax');
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is32bit', (t) => {
    const result = is32bit('eax');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is32bit: wide register', (t) => {
    const result = is32bit('rax');
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is64bit', (t) => {
    const result = is64bit('rax');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: is64bit: narrow register', (t) => {
    const result = is64bit('eax');
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r8', (t) => {
    const result = isRegister('r8');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r8d', (t) => {
    const result = isRegister('r8d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r8w', (t) => {
    const result = isRegister('r8w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r8b', (t) => {
    const result = isRegister('r8b');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r9', (t) => {
    const result = isRegister('r9');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r9d', (t) => {
    const result = isRegister('r9d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r9w', (t) => {
    const result = isRegister('r9w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r9b', (t) => {
    const result = isRegister('r9b');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r10', (t) => {
    const result = isRegister('r10');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r10d', (t) => {
    const result = isRegister('r10d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r10w', (t) => {
    const result = isRegister('r10w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r10b', (t) => {
    const result = isRegister('r10b');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r11', (t) => {
    const result = isRegister('r11');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r11d', (t) => {
    const result = isRegister('r11d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r11w', (t) => {
    const result = isRegister('r11w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r11b', (t) => {
    const result = isRegister('r11b');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r12', (t) => {
    const result = isRegister('r12');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r12d', (t) => {
    const result = isRegister('r12d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r12w', (t) => {
    const result = isRegister('r12w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r12b', (t) => {
    const result = isRegister('r12b');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r13', (t) => {
    const result = isRegister('r13');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r13d', (t) => {
    const result = isRegister('r13d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r13w', (t) => {
    const result = isRegister('r13w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r13b', (t) => {
    const result = isRegister('r13b');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r14', (t) => {
    const result = isRegister('r14');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r14d', (t) => {
    const result = isRegister('r14d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r14w', (t) => {
    const result = isRegister('r14w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r14b', (t) => {
    const result = isRegister('r14b');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r15', (t) => {
    const result = isRegister('r15');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r15d', (t) => {
    const result = isRegister('r15d');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r15w', (t) => {
    const result = isRegister('r15w');
    
    t.ok(result);
    t.end();
});

test('nirguna: operator-fasm: regs: isRegister: r15b', (t) => {
    const result = isRegister('r15b');
    
    t.ok(result);
    t.end();
});
