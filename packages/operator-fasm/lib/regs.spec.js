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
