import {createTest} from '@putout/test';
import * as plugin from './index.js';
import * as applyEquality from '../apply-equality/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-declaration-to-mov', plugin],
    ],
});

test('fasm: convert-declaration-to-mov: report', (t) => {
    t.report('convert-declaration-to-mov', `Use 'mov' instead of 'const'`);
    t.end();
});

test('fasm: convert-declaration-to-mov: transform', (t) => {
    t.transform('convert-declaration-to-mov');
    t.end();
});

test('fasm: convert-declaration-to-mov: transform: apply-equality', (t) => {
    t.transform('apply-equality', {
        applyEquality,
    });
    t.end();
});

test('fasm: convert-declaration-to-mov: no report: not-reg', (t) => {
    t.noReport('not-reg');
    t.end();
});

test('fasm: convert-declaration-to-mov: transform: let', (t) => {
    t.transform('let');
    t.end();
});
