import {test} from 'supertape';
import {
    bios,
    debug,
    io,
    org,
    use16,
    use32,
} from './index.ts';

test('nirguna: operator-fasm: org', (t) => {
    const result = org(0x7c00);
    
    t.equal(result, 0x7c00);
    t.end();
});

test('nirguna: operator-fasm: debug', (t) => {
    const result = debug('hello');
    
    t.equal(result, 'hello');
    t.end();
});

test('nirguna: operator-fasm: io.in', (t) => {
    const result = io.in(1, 2);
    
    t.equal(result, 3);
    t.end();
});

test('nirguna: operator-fasm: io.out', (t) => {
    const result = io.out(0xe9, 1);
    
    t.equal(result, 0xea);
    t.end();
});

test('nirguna: operator-fasm: use16', (t) => {
    const result = use16();
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-fasm: use32', (t) => {
    const result = use32();
    
    t.notOk(result);
    t.end();
});

test('nirguna: operator-fasm: bios.reboot', (t) => {
    const result = bios.reboot();
    
    t.notOk(result);
    t.end();
});
