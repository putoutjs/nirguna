import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';
import montag from 'montag';
import {bundle} from '../lib/bundler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
