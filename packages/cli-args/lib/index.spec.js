import {test} from 'supertape';
import {parseArgs} from './parse-args.js';
import {validateArgs} from './validate-args.js';
import {parseConfig} from './parse-config.js';

test('nirguna: cli-args: exports: parseArgs', async (t) => {
    const {parseArgs: result} = await import('./index.js');
    
    t.equal(result, parseArgs);
    t.end();
});

test('nirguna: cli-args: exports: validateArgs', async (t) => {
    const {validateArgs: result} = await import('./index.js');
    
    t.equal(result, validateArgs);
    t.end();
});

test('nirguna: cli-args: exports: parseConfig', async (t) => {
    const {parseConfig: result} = await import('./index.js');
    
    t.equal(result, parseConfig);
    t.end();
});
