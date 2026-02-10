import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-read-sector-to-int-0xff', plugin],
    ],
});

test('nemesis: convert-read-sector-to-int-0xff: report', (t) => {
    t.report('convert-read-sector-to-int-0xff', `Use '0xff' instead of 'nemesis.readSector()'`);
    t.end();
});

test('nemesis: convert-read-sector-to-int-0xff: transform', (t) => {
    t.transform('convert-read-sector-to-int-0xff');
    t.end();
});

test('nemesis: convert-read-sector-to-int-0xff: transform: al', (t) => {
    t.transform('al');
    t.end();
});
