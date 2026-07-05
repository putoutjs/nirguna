import {createTest} from '#printer-fasm/test';

const {test} = createTest(import.meta.url);

test('nirguna: printer-fasm', (t) => {
    t.transform('main');
    t.end();
});

test('nirguna: printer-fasm: label: start', (t) => {
    t.transform('label-start');
    t.end();
});

test('nirguna: printer-fasm: label', (t) => {
    t.transform('label');
    t.end();
});

test('nirguna: printer-fasm: jmp far', (t) => {
    t.transform('jmp-far');
    t.end();
});

test('nirguna: printer-fasm: jmp far: inside label', (t) => {
    t.transform('jmp-far-inside-label');
    t.end();
});

test('nirguna: printer-fasm: db', (t) => {
    t.transform('db');
    t.end();
});

test('nirguna: printer-fasm: db: couple', (t) => {
    t.transform('db-couple');
    t.end();
});

test('nirguna: printer-fasm: AssignmentExpression', (t) => {
    t.transform('assignment-expression');
    t.end();
});

test('nirguna: printer-fasm: AssignmentExpression: byte ptr', (t) => {
    t.transform('assignment-expression-byte-ptr');
    t.end();
});

test('nirguna: printer-fasm: maxElementLengthInOneLine', (t) => {
    t.transform('max-element-length');
    t.end();
});

test('nirguna: printer-fasm: in/out', (t) => {
    t.transform('in-out');
    t.end();
});

test('nirguna: printer-fasm: include', (t) => {
    t.transform('include');
    t.end();
});

test('nirguna: printer-fasm: quotes', (t) => {
    t.transform('quotes');
    t.end();
});

test('nirguna: printer-fasm: escape', (t) => {
    t.transform('escape');
    t.end();
});

test('nirguna: printer-fasm: assign', (t) => {
    t.transform('assign');
    t.end();
});
