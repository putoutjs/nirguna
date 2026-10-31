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
