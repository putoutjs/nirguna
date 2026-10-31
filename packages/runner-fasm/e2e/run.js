import {test} from 'supertape';
import {translate} from 'fasm.js';
import {run} from '../lib/runner.js';
import {createBoot} from './lib/boot-image.js';

const SOURCE = `
    format ELF64 executable 3
    segment readable executable
    entry $
    mov rax, 1
    mov rdi, 1
    lea rsi, [msg]
    mov rdx, 3
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall
    segment readable writable
    msg db 'ok', 0xA
`;

test('nirguna: runner-fasm: run: elf', async (t) => {
    const [binary] = await translate(SOURCE);
    const result = await run(binary);
    
    t.equal(result, 'ok\n');
    t.end();
});

test('nirguna: runner-fasm: run: boot', async (t) => {
    const result = await run(createBoot());
    
    t.equal(result, 'O');
    t.end();
}, {
    timeout: 30_000,
});
