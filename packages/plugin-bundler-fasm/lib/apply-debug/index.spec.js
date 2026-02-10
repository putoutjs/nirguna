import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-debug', plugin],
    ],
});

test('bundler-fasm: apply-debug: report', (t) => {
    t.report('apply-debug', `Apply 'debug()'`);
    t.end();
});

test('bundler-fasm: apply-debug: transform', (t) => {
    t.transform('apply-debug');
    t.end();
});

test('bundler-fasm: apply-debug: transform with options: apply-debug-options', (t) => {
    t.transformWithOptions('apply-debug-options', {
        debug: true,
    });
    t.end();
});

test('bundler-fasm: apply-debug: transform with options: label', (t) => {
    t.transformWithOptions('label', {
        debug: false,
    });
    t.end();
});

test('bundler-fasm: apply-debug: transform with options: port', (t) => {
    t.transformWithOptions('port', {
        debug: 'port',
    });
    t.end();
});

test('bundler-fasm: apply-debug: transform with options: port: 2', (t) => {
    t.transformWithOptions('port', {
        debug: '2',
    });
    t.end();
});

test('bundler-fasm: apply-debug: transform with options: wrong-debug', (t) => {
    t.transformWithOptions('wrong-debug', {
        debug: 'putout:runner:fix',
    });
    t.end();
});
