import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-imports', plugin],
    ],
});

test('nemesis: remove-useless-imports: report', (t) => {
    t.report('remove-useless-imports', `Avoid imports`);
    t.end();
});

test('nemesis: remove-useless-imports: transform', (t) => {
    t.transform('remove-useless-imports');
    t.end();
});
