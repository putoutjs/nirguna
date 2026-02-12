import {fileURLToPath} from 'node:url';
import {test, stub} from 'supertape';
import {parseConfig} from './parse-config.js';

const {assign} = Object;

const __filename = fileURLToPath(import.meta.url);

test('nirguna: cli-options: parse-options', async (t) => {
    const [, result] = await parseConfig(__filename);
    const expected = {
        debug: false,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: cli-options: parse-options: debug: 1', (t) => {
    const env = {
        DEBUG: '1',
    };
    
    const [, result] = parseConfig(__filename, {
        env,
    });
    
    const expected = {
        debug: '1',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: cli-options: parse-options: debug', (t) => {
    const env = {
        DEBUG: '2',
    };
    
    const [, result] = parseConfig(__filename, {
        env,
    });
    
    const expected = {
        debug: '2',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: cli-options: parse-options: options', (t) => {
    const originalError = Error('parse error');
    const readConfig = stub().throws(originalError);
    const [error] = parseConfig(__filename, {
        readConfig,
    });
    
    t.equal(error, originalError);
    t.end();
});

test('nirguna: cli-options: parse-options: options: not found', (t) => {
    const originalError = Error('parse error');
    
    assign(originalError, {
        code: 'MODULE_NOT_FOUND',
    });
    
    const readConfig = stub().throws(originalError);
    
    const [error] = parseConfig(__filename, {
        readConfig,
    });
    
    t.notOk(error);
    t.end();
});

test('nirguna: cli-options: parse-options: options: findUpSync', (t) => {
    const originalError = Error('parse error');
    
    assign(originalError, {
        code: 'MODULE_NOT_FOUND',
    });
    
    const readConfig = stub().throws(originalError);
    const findUpSync = stub();
    
    parseConfig(__filename, {
        readConfig,
        findUpSync,
    });
    
    t.calledOnce(readConfig);
    t.end();
});

test('nirguna: cli-options: parse-options: readConfigAgain', (t) => {
    const originalError = Error('parse error');
    
    assign(originalError, {
        code: 'MODULE_NOT_FOUND',
    });
    
    const readConfig = stub().throws(originalError);
    const findUpSync = stub().returns('hello');
    const readConfigAgain = stub();
    
    parseConfig(__filename, {
        readConfig,
        findUpSync,
        readConfigAgain,
    });
    
    t.calledWith(readConfigAgain, ['hello']);
    t.end();
});

test('nirguna: cli-options: parse-options: readConfigAgain: error', (t) => {
    const originalError = Error('parse error');
    
    assign(originalError, {
        code: 'MODULE_NOT_FOUND',
    });
    
    const readConfig = stub().throws(originalError);
    const findUpSync = stub().returns('hello');
    const readConfigAgain = stub().throws(originalError);
    
    const result = parseConfig(__filename, {
        readConfig,
        findUpSync,
        readConfigAgain,
    });
    
    const expected = [null, {
        debug: false,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
