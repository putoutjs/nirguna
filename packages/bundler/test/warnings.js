import {promisify} from 'node:util';
import process from 'node:process';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';
import {montag} from 'montag';

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const script = join(__dirname, 'fixture', 'bundle.js');

const bundleInChild = (name) => execFileAsync(process.execPath, [script, name]);

const getStderr = async (name) => {
    const {stderr} = await bundleInChild(name);
    
    return stderr;
};

const getStdout = async (name) => {
    const {stdout} = await bundleInChild(name);
    
    return stdout;
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

test('nirguna: bundler: warnings: circular dependency: bundle', async (t) => {
    const result = await getStdout(join('circular', 'index.js'));
    const expected = montag`
        const b = () => a;
        
        const a = () => b();
        
        a();\n
    `;
    
    t.equal(result, expected);
    t.end();
});
