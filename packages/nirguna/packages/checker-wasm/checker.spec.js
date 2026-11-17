import {test} from 'supertape';
import {montag} from 'montag';
import {check} from '#checker-wasm';

test('nirguna: checker-wasm: supported', (t) => {
    const source = montag`
        export function add(a: i32, b: i32): i32 {
            return i32.add(local.get(a), local.get(b));
        }
    `;
    
    const [, result] = check(source);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker-wasm: supported: function expression of an import', (t) => {
    const source = montag`
        __nirguna_wasm_import('console', 'log', function log(i32: i32): i32 {
            return i32;
        });
    `;
    
    const [, result] = check(source);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker-wasm: supported: empty statement after a function', (t) => {
    const [, result] = check('export function a(): i32 {};\n');
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker-wasm: class', (t) => {
    const [, [{message}]] = check('export class A {}\n');
    
    t.equal(message, `Unsupported 'ClassDeclaration': class A {}`);
    t.end();
});

test('nirguna: checker-wasm: template literal', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            return \`x\${a}\`;
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, 'Unsupported \'TemplateLiteral\': `x${a}`');
    t.end();
});

test('nirguna: checker-wasm: switch', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            switch (a) {
                default: return a;
            }
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'SwitchStatement': switch (a) {`);
    t.end();
});

test('nirguna: checker-wasm: object', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            return {a};
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'ObjectExpression': {a}`);
    t.end();
});

test('nirguna: checker-wasm: try', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            try {
                a();
            } catch {}
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'TryStatement': try {`);
    t.end();
});

test('nirguna: checker-wasm: arrow function', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            return a.map((x: i32): i32 => x);
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'ArrowFunctionExpression': (x: i32): i32 => x`);
    t.end();
});

test('nirguna: checker-wasm: for', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            for (;;) {}
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'ForStatement': for (;;) {}`);
    t.end();
});

test('nirguna: checker-wasm: while', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            while (a) a--;
            return a;
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'WhileStatement': while (a) a--;`);
    t.end();
});

test('nirguna: checker-wasm: variable declaration', (t) => {
    const source = montag`
        export function f(a: i32): i32 {
            let n = 0;
            return n;
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'VariableDeclaration': let n = 0;`);
    t.end();
});

test('nirguna: checker-wasm: the source stays', (t) => {
    const source = 'export class A {}\n';
    const [result] = check(source);
    
    t.equal(result, source);
    t.end();
});
