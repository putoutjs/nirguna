import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';
import {montag} from 'montag';
import {bundle} from '../lib/bundler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function emitAssets() {
    this.emitFile({
        type: 'asset',
        fileName: 'a.txt',
        source: 'text',
    });
    
    this.emitFile({
        type: 'asset',
        fileName: 'b.bin',
        source: new Uint8Array([104, 105]),
    });
}

const assets = () => ({
    name: 'assets',
    buildStart: emitAssets,
});

const pushSpy = (seen) => {
    seen.push('spy');
};

const createSpy = (seen) => ({
    name: 'spy',
    buildStart: pushSpy.bind(null, seen),
});

test('nirguna: bundler', async (t) => {
    const filePath = join(__dirname, 'fixture', 'index.js');
    const [, result] = await bundle(filePath);
    
    const expected = montag`
        const hello = () => 'hello';
        
        hello();\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: bundler: config', async (t) => {
    const filePath = join(__dirname, 'fixture', 'config.js');
    const [, result] = await bundle(filePath, {
        external: [
            '@nirguna/operator-nemesis',
        ],
    });
    
    const expected = montag`
        import { nemesis } from '@nirguna/operator-nemesis';
        
        nemesis.printf();\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: bundler: external', async (t) => {
    const filePath = join(__dirname, 'fixture', 'index.js');
    const externalPath = join(__dirname, 'fixture', 'hello.js');
    
    const [, result] = await bundle(filePath, {
        external: [externalPath],
    });
    
    const expected = montag`
        import { hello } from './hello.js';
        
        hello();\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: bundler: unresolved import', async (t) => {
    const filePath = join(__dirname, 'fixture', 'unresolved.js');
    const [, result] = await bundle(filePath);
    
    const expected = montag`
        import { x } from 'not-installed-package';
        
        x();\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: bundler: unused external import', async (t) => {
    const filePath = join(__dirname, 'fixture', 'unused-external.js');
    const [, result] = await bundle(filePath);
    
    const expected = montag`
        import '@nirguna/operator-fasm';
        
        const a = 5;\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: bundler: circular dependency', async (t) => {
    const filePath = join(__dirname, 'fixture', 'circular', 'index.js');
    const [, result] = await bundle(filePath);
    
    const expected = montag`
        const b = () => a;
        
        const a = () => b();
        
        a();\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: bundler: syntax error', async (t) => {
    const filePath = join(__dirname, 'fixture', 'syntax-error.js');
    const [error] = await bundle(filePath);
    
    t.equal(error.message, `Variable declaration expected: 'const = ;'`);
    t.end();
});

test('nirguna: bundler: no entry', async (t) => {
    const filePath = join(__dirname, 'fixture', 'missing-entry.js');
    const [error] = await bundle(filePath);
    
    t.equal(error.code, 'UNRESOLVED_ENTRY');
    t.end();
});

test('nirguna: bundler: rollup plugins: assets', async (t) => {
    const filePath = join(__dirname, 'fixture', 'index.js');
    const [, result] = await bundle(filePath, {
        rollup: {
            plugins: [
                assets(),
            ],
        },
    });
    
    const expected = montag`
        const hello = () => 'hello';
        
        hello();
        texthi
    `;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: bundler: config: plugins are for Putout, not for Rollup', async (t) => {
    const filePath = join(__dirname, 'fixture', 'index.js');
    const [error] = await bundle(filePath, {
        plugins: ['@nirguna/plugin-nemesis'],
    });
    
    t.notOk(error);
    t.end();
});

test('nirguna: bundler: config: rollup plugins and Putout plugins together', async (t) => {
    const filePath = join(__dirname, 'fixture', 'index.js');
    const seen = [];
    
    const [error] = await bundle(filePath, {
        plugins: ['@nirguna/plugin-nemesis'],
        rollup: {
            plugins: [
                createSpy(seen),
            ],
        },
    });
    
    const result = [error, seen];
    const expected = [
        null,
        ['spy'],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
