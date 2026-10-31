import {Buffer} from 'node:buffer';
import {spawnSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import process from 'node:process';
import {
    copyFileSync,
    mkdtempSync,
    readdirSync,
    readFileSync,
} from 'node:fs';
import {test} from 'supertape';

const cli = fileURLToPath(new URL('../bin/nirguna.js', import.meta.url));
const fixtureDir = fileURLToPath(new URL('./fixture', import.meta.url));

const cache = new Map();

const readFromDir = (dir, name) => readFileSync(join(dir, name));

const runCli = (fixtures, args) => {
    const dir = mkdtempSync(join(tmpdir(), 'nirguna-cli-'));
    
    for (const name of fixtures)
        copyFileSync(join(fixtureDir, name), join(dir, name));
    
    const {
        status,
        stdout,
        stderr,
    } = spawnSync(process.execPath, [cli, '-q', ...args], {
        cwd: dir,
    });
    
    return {
        status,
        stdout,
        stderr: String(stderr),
        read: readFromDir.bind(null, dir),
        files: readdirSync(dir).sort(),
    };
};

const run = (fixtures, args) => {
    const key = JSON.stringify([fixtures, args]);
    
    if (!cache.has(key))
        cache.set(key, runCli(fixtures, args));
    
    return cache.get(key);
};

test('nirguna: cli: e2e: syntax error: exit code', (t) => {
    const {status} = run(['bad.js'], ['-t', 'fasm', 'bad.js']);
    
    t.equal(status, 1);
    t.end();
});

test('nirguna: cli: e2e: syntax error: stdout is empty', (t) => {
    const {stdout} = run(['bad.js'], ['-t', 'fasm', 'bad.js']);
    const result = String(stdout);
    
    t.equal(result, '');
    t.end();
});

test('nirguna: cli: e2e: syntax error: message has the line number', (t) => {
    const {stderr} = run(['bad.js'], ['-t', 'fasm', 'bad.js']);
    
    t.match(stderr, 'bad.js:3:');
    t.end();
});

test('nirguna: cli: e2e: syntax error: message quotes the broken line', (t) => {
    const {stderr} = run(['bad.js'], ['-t', 'fasm', 'bad.js']);
    
    t.match(stderr, `'const = ;'`);
    t.end();
});

test('nirguna: cli: e2e: syntax error in an imported file: message has the file and the line', (t) => {
    const {stderr} = run(['bad-import.js', 'bad-dep.js'], ['-t', 'fasm', 'bad-import.js']);
    
    t.match(stderr, 'bad-dep.js:2:');
    t.end();
});

test('nirguna: cli: e2e: syntax error in an imported file: message quotes the broken line', (t) => {
    const {stderr} = run(['bad-import.js', 'bad-dep.js'], ['-t', 'fasm', 'bad-import.js']);
    
    t.match(stderr, `'const = ;'`);
    t.end();
});

test('nirguna: cli: e2e: wast: exit code', (t) => {
    const {status} = run(['add.ts'], ['-t', 'wast', 'add.ts']);
    
    t.equal(status, 0);
    t.end();
});

test('nirguna: cli: e2e: wast: output is WebAssembly text', (t) => {
    const {read} = run(['add.ts'], ['-t', 'wast', 'add.ts']);
    const result = String(read('add.wast'));
    
    t.match(result, /^\(module/);
    t.end();
});

test('nirguna: cli: e2e: wast: writes only <name>.wast', (t) => {
    const {files} = run(['add.ts'], ['-t', 'wast', 'add.ts']);
    const expected = [
        'add.ts',
        'add.wast',
    ];
    
    t.deepEqual(files, expected);
    t.end();
});

test('nirguna: cli: e2e: asm: writes only <name>.asm', (t) => {
    const {files} = run(['asm.ts'], ['-t', 'asm', 'asm.ts']);
    const expected = [
        'asm.asm',
        'asm.ts',
    ];
    
    t.deepEqual(files, expected);
    t.end();
});

test('nirguna: cli: e2e: asm: output is assembly text', (t) => {
    const {read} = run(['asm.ts'], ['-t', 'asm', 'asm.ts']);
    const result = String(read('asm.asm'));
    
    t.match(result, /^xor eax, eax/);
    t.end();
});

test('nirguna: cli: e2e: wasm: writes only <name>.wasm', (t) => {
    const {files} = run(['add.ts'], ['-t', 'wasm', 'add.ts']);
    const expected = [
        'add.ts',
        'add.wasm',
    ];
    
    t.deepEqual(files, expected);
    t.end();
});

test('nirguna: cli: e2e: -o binary: exit code', (t) => {
    const {status} = run(['boot.ts'], [
        '-t',
        'boot',
        '-o',
        'binary',
        'boot.ts',
    ]);
    
    t.equal(status, 0);
    t.end();
});

test('nirguna: cli: e2e: -o binary: stdout is the boot sector', (t) => {
    const {stdout} = run(['boot.ts'], [
        '-t',
        'boot',
        '-o',
        'binary',
        'boot.ts',
    ]);
    
    const result = stdout.subarray(510);
    const expected = Buffer.from([0x55, 0xaa]);
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: cli: e2e: -o binary: writes no file', (t) => {
    const {files} = run(['boot.ts'], [
        '-t',
        'boot',
        '-o',
        'binary',
        'boot.ts',
    ]);
    
    const expected = ['boot.ts'];
    
    t.deepEqual(files, expected);
    t.end();
});
