import {test} from 'supertape';
import {create} from '@nirguna/operator-wasm';
import {prepare} from './test.js';

const createWast = () => {
    const stack = [];
    const imports = [
        ['console', 'log', (a) => a],
    ];
    
    const {
        i32,
        local,
        call,
    } = create({
        stack,
        imports,
    });
    
    return {
        stack,
        imports,
        add: (a, b) => {
            i32.add(local.get(a), local.get(b));
        },
        log: (a) => {
            stack[0] = call('log', a);
        },
    };
};

test('nirguna: test-wasm: prepare: result of function', (t) => {
    const {add} = prepare(createWast());
    const result = add(4, 6);
    
    t.equal(result, 10);
    t.end();
});

test('nirguna: test-wasm: prepare: stack is not exported', (t) => {
    const prepared = prepare(createWast());
    
    t.notOk(prepared.stack);
    t.end();
});

test('nirguna: test-wasm: prepare: imports is not exported', (t) => {
    const prepared = prepare(createWast());
    
    t.notOk(prepared.imports);
    t.end();
});

test('nirguna: test-wasm: prepare: import', (t) => {
    const {log} = prepare(createWast());
    const result = log(21);
    
    t.equal(result, 21);
    t.end();
});

test('nirguna: test-wasm: declareImport: override', (t) => {
    const {log, declareImport} = prepare(createWast());
    
    declareImport('console', 'log', (a) => a * 2);
    
    const result = log(21);
    
    t.equal(result, 42);
    t.end();
});

test('nirguna: test-wasm: declareImport: unknown import', (t) => {
    const {log, declareImport} = prepare(createWast());
    
    declareImport('console', 'warn', (a) => a * 2);
    
    const result = log(21);
    
    t.equal(result, 21);
    t.end();
});

test('nirguna: test-wasm: undeclareImport', (t) => {
    const {
        log,
        declareImport,
        undeclareImport,
    } = prepare(createWast());
    
    declareImport('console', 'log', (a) => a * 2);
    undeclareImport('console', 'log');
    
    const result = log(21);
    
    t.equal(result, 21);
    t.end();
});

test('nirguna: test-wasm: undeclareImport: unknown import', (t) => {
    const {
        log,
        declareImport,
        undeclareImport,
    } = prepare(createWast());
    
    declareImport('console', 'log', (a) => a * 2);
    undeclareImport('console', 'warn');
    
    const result = log(21);
    
    t.equal(result, 42);
    t.end();
});
