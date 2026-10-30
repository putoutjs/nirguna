import {join, dirname} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const script = join(__dirname, 'fixture', 'compile.js');
const isOutputName = ([name]) => !['OUTPUT', 'RAW'].includes(name);

const compile = async (env = {}, name = 'local-set') => {
    const clean = Object.fromEntries(
        Object
            .entries(process.env)
            .filter(isOutputName),
    );
    
    const {stdout} = await execFileAsync(process.execPath, [script, name], {
        env: {
            ...clean,
            ...env,
        },
    });
    
    return stdout;
};

test('nirguna: test: compileExtension: wasm', async (t) => {
    const stdout = await compile();
    
    t.equal(stdout, 'equal: 7 7\n');
    t.end();
});

test('nirguna: test: compileExtension: OUTPUT=bundle: print bundled code', async (t) => {
    const stdout = await compile({
        OUTPUT: 'bundle',
    });
    
    t.match(stdout, 'entry()');
    t.end();
});

test('nirguna: test: compileExtension: OUTPUT=bundle: run after print', async (t) => {
    const stdout = await compile({
        OUTPUT: 'bundle',
    });
    
    const result = stdout.endsWith('equal: 7 7\n');
    
    t.ok(result);
    t.end();
});

test('nirguna: test: compileExtension: OUTPUT=assembly: print code frame', async (t) => {
    const stdout = await compile({
        OUTPUT: 'assembly',
    });
    
    t.match(stdout, '(module');
    t.end();
});

test('nirguna: test: compileExtension: OUTPUT=assembly: fail', async (t) => {
    const stdout = await compile({
        OUTPUT: 'assembly',
    });
    
    const result = stdout.endsWith('fail: output\n');
    
    t.ok(result);
    t.end();
});

test('nirguna: test: compileExtension: OUTPUT=assembly: RAW', async (t) => {
    const stdout = await compile({
        OUTPUT: 'assembly',
        RAW: '1',
    });
    
    const result = stdout.startsWith('(module\n');
    
    t.ok(result);
    t.end();
});

test('nirguna: test: compileExtension: OUTPUT=binary: not a string', async (t) => {
    const stdout = await compile({
        OUTPUT: 'binary',
    });
    
    const result = stdout.startsWith('Uint8Array(');
    
    t.ok(result);
    t.end();
});

test('nirguna: test: compileExtension: bundle error', async (t) => {
    const stdout = await compile({}, 'syntax-error');
    
    t.equal(stdout, `fail: Variable declaration expected: 'const = ;'\n`);
    t.end();
});

test('nirguna: test: compileExtension: places', async (t) => {
    const stdout = await compile({}, 'places');
    
    t.equal(stdout, 'fail: Undefined function variable "$missing"\n');
    t.end();
});
