import {compile} from 'nirguna';
import {bundle} from '@nirguna/bundler';
import {test} from 'supertape';
import config from '../.nirguna.json' with {
    type: 'json',
};

test('nirguna: nemesis: kernel: bundle', async (t) => {
    const filePath = new URL('./kernel.ts', import.meta.url).pathname;
    const [error] = await bundle(filePath);
    
    t.notOk(error);
    t.end();
});

test.skip('nirguna: nemesis: kernel: compile', async (t) => {
    const filePath = new URL('./kernel.ts', import.meta.url).pathname;
    const [, bundled] = await bundle(filePath, config);
    const [, places] = await compile(bundled, {
        target: 'fasm',
        config,
    });
    
    const expected = [];
    
    t.deepEqual(places, expected);
    t.end();
}, {
    timeout: 10_000,
});
