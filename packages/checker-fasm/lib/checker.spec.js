import {test} from 'supertape';
import {montag} from 'montag';
import {check} from './checker.js';

test('nirguna: checker-fasm: supported', (t) => {
    const source = montag`
        mov(ax, [bp + 4]);
        start: {
            inc(ax);
            jmp(start);
        }
    `;
    
    const [, result] = check(source);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker-fasm: supported: string and sequence', (t) => {
    const source = montag`
        db('hello', 0);
        mov(ax, 1), mov(bx, 2);
    `;
    
    const [, result] = check(source);
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker-fasm: supported: assignment', (t) => {
    const [, result] = check('ax = 1;\n');
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker-fasm: supported: member', (t) => {
    const [, result] = check('mov(ax, a.b);\n');
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker-fasm: function that is not lowered', (t) => {
    const source = montag`
        export async function f() {
            for (;;) {}
        }
    `;
    
    const [, [{message}]] = check(source);
    
    t.equal(message, `Unsupported 'ExportNamedDeclaration': export async function f() {`);
    t.end();
});

test('nirguna: checker-fasm: variable declaration', (t) => {
    const [, [{message}]] = check('let n = 0;\n');
    
    t.equal(message, `Unsupported 'VariableDeclaration': let n = 0;`);
    t.end();
});

test('nirguna: checker-fasm: if', (t) => {
    const [, [{message}]] = check('if (a) {}\n');
    
    t.equal(message, `Unsupported 'IfStatement': if (a) {}`);
    t.end();
});

test('nirguna: checker-fasm: class', (t) => {
    const [, [{message}]] = check('class A {}\n');
    
    t.equal(message, `Unsupported 'ClassDeclaration': class A {}`);
    t.end();
});

test('nirguna: checker-fasm: supported: tagged template', (t) => {
    const [, result] = check('include`hello.inc`;\n');
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});
