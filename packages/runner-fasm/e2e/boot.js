import {test} from 'supertape';
import {boot} from '../lib/boot.js';
import {createBoot} from './lib/boot-image.js';

test('nirguna: runner-fasm: boot: debug port', async (t) => {
    const result = await boot(createBoot());
    
    t.equal(result, 'O');
    t.end();
}, {
    timeout: 30_000,
});
