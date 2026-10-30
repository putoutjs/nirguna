import {join, dirname} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const script = join(__dirname, 'fixture', 'bundle.js');

const getStderr = async (name) => {
    const {stderr} = await execFileAsync(process.execPath, [script, name]);
    
    return stderr;
};

test('nirguna: bundler: warnings: unresolved import: no warning', async (t) => {
    const stderr = await getStderr('unresolved.js');
    
    t.equal(stderr, '');
    t.end();
});

test('nirguna: bundler: warnings: unused external import: no warning', async (t) => {
    const stderr = await getStderr('unused-external.js');
    
    t.equal(stderr, '');
    t.end();
});

test('nirguna: bundler: warnings: circular dependency: print warning', async (t) => {
    const stderr = await getStderr(join('circular', 'index.js'));
    
    t.match(stderr, 'Circular dependency');
    t.end();
});
