import {compile} from 'nirguna';
import {bundle} from '@nirguna/bundler';
import {test} from 'supertape';

test('nirguna: nemesis: boot: bundle', async (t) => {
    const filePath = new URL('./index.js', import.meta.url).pathname;
    const [error] = await bundle(filePath);
    
    t.notOk(error);
    t.end();
});

test('nirguna: nemesis: boot: compile', async (t) => {
    const filePath = new URL('./index.js', import.meta.url).pathname;
    const [, bundled] = await bundle(filePath);
    const [, places] = await compile(bundled, {
        target: 'fasm',
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
});
