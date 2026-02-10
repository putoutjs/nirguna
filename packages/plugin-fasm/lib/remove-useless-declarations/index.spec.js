import {createTest} from '@putout/test';
import montag from 'montag';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-declarations', plugin],
    ],
});

test('fasm: remove-useless-declarations: report', (t) => {
    t.report('remove-useless-declarations', `Avoid useless import of '#operator-fasm'`);
    t.end();
});

test('fasm: remove-useless-declarations: transform', (t) => {
    t.transform('remove-useless-declarations');
    t.end();
});

test('fasm: remove-useless-declarations: transform: namespace', (t) => {
    t.transform('namespace');
    t.end();
});

test('fasm: remove-useless-declarations: transform: export', (t) => {
    const source = montag`
        export {
            _nirguna_compare,
        }
    `;
    
    t.transformCode(source, '\n');
    t.end();
});
