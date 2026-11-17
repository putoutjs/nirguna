import {test} from 'supertape';
import {
    resolve,
    TARGETS,
    DEFAULT,
} from '#backends';
import {wasm} from '#backend-wasm';
import {fasm} from '#backend-fasm';

const noop = () => {};

test('nirguna: backends: resolve: wasm: backend', (t) => {
    const [backend] = resolve({
        target: 'wasm',
    });
    
    t.equal(backend, wasm);
    t.end();
});

test('nirguna: backends: resolve: wasm: options', (t) => {
    const [, result] = resolve({
        target: 'wasm',
        type: 'binary',
        stop: 'check',
        name: 'hello',
        optimization: false,
        onStageChange: noop,
        config: {},
    });
    
    const expected = {
        type: 'binary',
        stop: 'check',
        name: 'hello',
        optimization: false,
        onStageChange: noop,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: backends: resolve: wast: backend', (t) => {
    const [backend] = resolve({
        target: 'wast',
    });
    
    t.equal(backend, wasm);
    t.end();
});

test('nirguna: backends: resolve: wast: type is fixed', (t) => {
    const [, result] = resolve({
        target: 'wast',
        type: 'binary',
        name: 'hello',
    });
    
    const expected = {
        type: 'assembly',
        name: 'hello',
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: backends: resolve: fasm: backend', (t) => {
    const [backend] = resolve({
        target: 'nemesis',
    });
    
    t.equal(backend, fasm);
    t.end();
});

test('nirguna: backends: resolve: fasm: options', (t) => {
    const config = {
        plugins: [],
    };
    
    const [, result] = resolve({
        target: 'nemesis',
        type: 'optimized',
        name: 'hello',
        config,
        optimization: false,
    });
    
    const expected = {
        target: 'nemesis',
        type: 'optimized',
        config,
        optimization: false,
    };
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: backends: resolve: no target: fasm', (t) => {
    const [backend] = resolve({});
    
    t.equal(backend, fasm);
    t.end();
});

test('nirguna: backends: resolve: target of Object.prototype: fasm', (t) => {
    const [backend] = resolve({
        target: 'toString',
    });
    
    t.equal(backend, fasm);
    t.end();
});

test('nirguna: backends: TARGETS: names', (t) => {
    const result = [...TARGETS.keys()];
    const expected = [
        'wasm',
        'wast',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: backends: DEFAULT: fasm', (t) => {
    t.equal(DEFAULT.backend, fasm);
    t.end();
});
