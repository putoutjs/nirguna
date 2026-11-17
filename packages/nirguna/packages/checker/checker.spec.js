import {test} from 'supertape';
import {montag} from 'montag';
import {checkNodes} from '#checker';

const CALLS = new Set([
    'Program',
    'ExpressionStatement',
    'CallExpression',
    'Identifier',
]);

test('nirguna: checker: no places', (t) => {
    const source = 'a();\n';
    const result = checkNodes(source, {
        isTS: false,
        allowed: CALLS,
    });
    
    const expected = [
        source,
        [],
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker: unsupported node: message', (t) => {
    const [, [{message}]] = checkNodes('a(1);\n', {
        isTS: false,
        allowed: CALLS,
    });
    
    t.equal(message, `Unsupported 'NumericLiteral': 1`);
    t.end();
});

test('nirguna: checker: unsupported node: position', (t) => {
    const source = montag`
        a();
        a(1);
    `;
    
    const [, [{position}]] = checkNodes(source, {
        isTS: false,
        allowed: CALLS,
    });
    
    const expected = {
        line: 2,
        column: 2,
    };
    
    t.deepEqual(position, expected);
    t.end();
});

test('nirguna: checker: unsupported node: the first line of the node', (t) => {
    const source = montag`
        a({
            b: 1,
        });
    `;
    
    const [, [{message}]] = checkNodes(source, {
        isTS: false,
        allowed: CALLS,
    });
    
    t.equal(message, `Unsupported 'ObjectExpression': {`);
    t.end();
});

test('nirguna: checker: unsupported node: at most 40 characters of the node', (t) => {
    const source = `a('${'x'.repeat(60)}');\n`;
    const [, [{message}]] = checkNodes(source, {
        isTS: false,
        allowed: CALLS,
    });
    
    const expected = `Unsupported 'StringLiteral': '${'x'.repeat(39)}`;
    
    t.equal(message, expected);
    t.end();
});

test('nirguna: checker: unsupported node: skip the children', (t) => {
    const [, places] = checkNodes('a(() => 1);\n', {
        isTS: false,
        allowed: CALLS,
    });
    
    t.equal(places.length, 1);
    t.end();
});

test('nirguna: checker: several places: in the order of the source', (t) => {
    const source = montag`
        a(1);
        a('b');
    `;
    
    const [, places] = checkNodes(source, {
        isTS: false,
        allowed: CALLS,
    });
    
    const result = [];
    
    for (const {message} of places) {
        result.push(message);
    }
    
    const expected = [
        `Unsupported 'NumericLiteral': 1`,
        `Unsupported 'StringLiteral': 'b'`,
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker: isTS: true', (t) => {
    const allowed = new Set([
        ...CALLS,
        'FunctionDeclaration',
        'BlockStatement',
        'TSTypeAnnotation',
        'TSTypeReference',
    ]);
    
    const [, result] = checkNodes('function a(b: c) {}\n', {
        isTS: true,
        allowed,
    });
    
    const expected = [];
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: checker: parse error: place', (t) => {
    const [, [{position}]] = checkNodes('a(', {
        isTS: false,
        allowed: CALLS,
    });
    
    const expected = {
        line: 1,
        column: 2,
    };
    
    t.deepEqual(position, expected);
    t.end();
});

test('nirguna: checker: parse error: source stays', (t) => {
    const [result] = checkNodes('a(', {
        isTS: false,
        allowed: CALLS,
    });
    
    t.equal(result, 'a(');
    t.end();
});
