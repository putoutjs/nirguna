import {createTest} from '@putout/test';
import * as plugin from './index.js';

const MESSAGE = 'The wasm backend cannot read a byte at an address yet';

const test = createTest(import.meta.url, {
    plugins: [
        ['report-byte-read', plugin],
    ],
});

test('wasm: report-byte-read: report: string-length', (t) => {
    t.report('string-length', MESSAGE);
    t.end();
});

test('wasm: report-byte-read: report: clear-buffer', (t) => {
    t.report('clear-buffer', [
        MESSAGE,
        MESSAGE,
    ]);
    t.end();
});

test('wasm: report-byte-read: report: strcmp', (t) => {
    t.report('strcmp', [
        MESSAGE,
        MESSAGE,
        MESSAGE,
    ]);
    t.end();
});

test('wasm: report-byte-read: report: many', (t) => {
    t.report('many', [
        MESSAGE,
        MESSAGE,
    ]);
    t.end();
});

test('wasm: report-byte-read: no report: property', (t) => {
    t.noReport('property');
    t.end();
});

test('wasm: report-byte-read: no report: call', (t) => {
    t.noReport('call');
    t.end();
});

test('wasm: report-byte-read: no report: local', (t) => {
    t.noReport('local');
    t.end();
});

test('wasm: report-byte-read: no report: global', (t) => {
    t.noReport('global');
    t.end();
});

test('wasm: report-byte-read: no transform: string-length', (t) => {
    t.noTransform('string-length');
    t.end();
});
