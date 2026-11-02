import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-registers', plugin],
    ],
});

test('fasm: apply-registers: report: string-length', (t) => {
    t.report('string-length', 'Apply: registers');
    t.end();
});

test('fasm: apply-registers: transform: string-length', (t) => {
    t.transform('string-length');
    t.end();
});

test('fasm: apply-registers: transform: clear-buffer', (t) => {
    t.transform('clear-buffer');
    t.end();
});

test('fasm: apply-registers: transform: strcmp', (t) => {
    t.transform('strcmp');
    t.end();
});

test('fasm: apply-registers: transform: hex-to-dec', (t) => {
    t.transform('hex-to-dec');
    t.end();
});

test('fasm: apply-registers: no transform: unknown-shape', (t) => {
    t.noTransform('unknown-shape');
    t.end();
});

test('fasm: apply-registers: no transform: without-facts', (t) => {
    t.noTransform('without-facts');
    t.end();
});
