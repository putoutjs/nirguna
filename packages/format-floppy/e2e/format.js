import {Buffer} from 'node:buffer';
import {test} from 'supertape';
import {format} from '../lib/format.js';
import {readFloppyFile} from '../lib/read-floppy-file.js';

const FLOPPY_SIZE = 1_474_560;

const KERNEL_SIZE = 2068;
const SHELL_SIZE = 1118;

const fill = (size, value) => Buffer.alloc(size, value);

test('nirguna: format-floppy: e2e: image has the size of a 1.44 MB floppy', async (t) => {
    const floppy = await format({});
    
    t.equal(floppy.length, FLOPPY_SIZE);
    t.end();
});

test('nirguna: format-floppy: e2e: image size is equal to the size in the boot record', async (t) => {
    const floppy = await format({});
    const declared = floppy.readUInt16LE(19) * floppy.readUInt16LE(11);
    
    t.equal(floppy.length, declared);
    t.end();
});

test('nirguna: format-floppy: e2e: image with a boot sector has the size of a 1.44 MB floppy', async (t) => {
    const boot = fill(512, 1);
    const floppy = await format({
        boot,
    });
    
    t.equal(floppy.length, FLOPPY_SIZE);
    t.end();
});

test('nirguna: format-floppy: e2e: two files of the size of the kernel and the shell', async (t) => {
    const kernel = fill(KERNEL_SIZE, 1);
    const shell = fill(SHELL_SIZE, 2);
    
    const floppy = await format({
        files: {
            'kernel.bin': kernel,
            'sh3ll.bin': shell,
        },
    });
    
    const result = [
        Buffer.from(await readFloppyFile('kernel.bin', floppy)),
        Buffer.from(await readFloppyFile('sh3ll.bin', floppy)),
    ];
    
    t.deepEqual(result, [kernel, shell]);
    t.end();
});

test('nirguna: format-floppy: e2e: boot sector keeps the boot signature', async (t) => {
    const boot = fill(512, 0);
    
    boot[510] = 0x55;
    boot[511] = 0xaa;
    
    const floppy = await format({
        boot,
    });
    
    const result = floppy.subarray(510, 512);
    const expected = Buffer.from([0x55, 0xaa]);
    
    t.deepEqual(result, expected);
    t.end();
});
