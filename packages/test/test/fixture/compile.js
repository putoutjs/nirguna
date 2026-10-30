import process from 'node:process';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {compileExtension} from '../../lib/compile-extension.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const [, , name = 'local-set'] = process.argv;

const run = (wasm, imports) => {
    const mod = new WebAssembly.Module(wasm);
    const {exports} = new WebAssembly.Instance(mod, imports);
    
    return exports;
};

const compile = compileExtension(__dirname, {
    run,
    target: 'wasm',
})({
    fail: (message) => console.log(`fail: ${message}`),
    equal: (a, b) => console.log(`equal: ${a} ${b}`),
});

await compile(name, 7n, 'entry');
