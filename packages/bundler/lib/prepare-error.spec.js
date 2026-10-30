import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';
import {prepareError} from './prepare-error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const id = join(__dirname, '..', 'test', 'fixture', 'index.js');

test('nirguna: bundler: prepareError: no loc: first line', async (t) => {
    const error = Error('Unexpected token.');
    
    error.id = id;
    
    const {message} = await prepareError(error);
    
    t.equal(message, `Unexpected token: 'import {hello} from './hello.js';'`);
    t.end();
});

test('nirguna: bundler: prepareError: no id: message', async (t) => {
    const error = Error('Unexpected token.');
    const {message} = await prepareError(error);
    
    t.equal(message, 'Unexpected token.');
    t.end();
});

test('nirguna: bundler: prepareError: no id: loc', async (t) => {
    const error = Error('Unexpected token.');
    const {loc} = await prepareError(error);
    
    t.ok(loc);
    t.end();
});
