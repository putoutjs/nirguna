import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['analyze-registers', plugin],
    ],
});

test('fasm: analyze-registers: report: string-length', (t) => {
    t.report('string-length', 'Analyze: registers');
    t.end();
});

test('fasm: analyze-registers: transform: string-length', (t) => {
    t.transform('string-length');
    t.end();
});

test('fasm: analyze-registers: transform: string-length-block', (t) => {
    t.transform('string-length-block');
    t.end();
});

test('fasm: analyze-registers: transform: clear-buffer', (t) => {
    t.transform('clear-buffer');
    t.end();
});

test('fasm: analyze-registers: transform: strcmp', (t) => {
    t.transform('strcmp');
    t.end();
});

test('fasm: analyze-registers: transform: hex-to-dec', (t) => {
    t.transform('hex-to-dec');
    t.end();
});

test('fasm: analyze-registers: no transform: hex-to-dec-two-parameters', (t) => {
    t.noTransform('hex-to-dec-two-parameters');
    t.end();
});

test('fasm: analyze-registers: no transform: strcmp-not-parameter', (t) => {
    t.noTransform('strcmp-not-parameter');
    t.end();
});

test('fasm: analyze-registers: no transform: other-shape', (t) => {
    t.noTransform('other-shape');
    t.end();
});

test('fasm: analyze-registers: no transform: assembly', (t) => {
    t.noTransform('assembly');
    t.end();
});

test('fasm: analyze-registers: no transform: not-parameter', (t) => {
    t.noTransform('not-parameter');
    t.end();
});

test('fasm: analyze-registers: no transform: with-facts', (t) => {
    t.noTransform('with-facts');
    t.end();
});
