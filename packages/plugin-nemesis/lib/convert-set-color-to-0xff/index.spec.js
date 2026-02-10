import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-set-color-to-0xff', plugin],
    ],
});

test('nemesis: convert-set-color-to-0xff: report', (t) => {
    t.report('convert-set-color-to-0xff', `Use '0xff' instead of 'nemesis.setColor()'`);
    t.end();
});

test('nemesis: convert-set-color-to-0xff: transform', (t) => {
    t.transform('convert-set-color-to-0xff');
    t.end();
});

test('nemesis: convert-set-color-to-0xff: transform: red', (t) => {
    t.transform('red');
    t.end();
});

test('nemesis: convert-set-color-to-0xff: transform: white', (t) => {
    t.transform('white');
    t.end();
});

test('nemesis: convert-set-color-to-0xff: transform: yellow', (t) => {
    t.transform('yellow');
    t.end();
});
