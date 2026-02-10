import {Buffer} from 'node:buffer';
import {test} from 'supertape';
import {format} from '../lib/format.js';
import {readFloppyFile} from '../lib/read-floppy-file.js';

test('nirguna: format-floppy: boot', async (t) => {
    const boot = Buffer.from('hello');
    const floppy = await format({
        boot,
    });
    
    const sector = floppy.subarray(0, boot.length);
    const result = sector.toString();
    
    t.equal(result, 'hello');
    t.end();
});

test('nirguna: format-floppy: no boot', async (t) => {
    const kernel = Buffer.from('hello world');
    const floppy = await format({
        files: {
            kernel,
        },
    });
    
    const result = Buffer.from(await readFloppyFile('kernel', floppy));
    
    t.deepEqual(result, kernel);
    t.end();
});
