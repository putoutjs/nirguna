import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-declarations', plugin],
    ],
});

test('nemesis: remove-useless-declarations: report', (t) => {
    t.report('remove-useless-declarations', `Avoid useless import of '@nirguna/operator-nemesis'`);
    t.end();
});

test('nemesis: remove-useless-declarations: transform', (t) => {
    t.transform('remove-useless-declarations');
    t.end();
});
