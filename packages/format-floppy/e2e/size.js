import {Buffer} from 'node:buffer';
import {test} from 'supertape';
import {tryCatch} from 'try-catch';
import {tryToCatch} from 'try-to-catch';
import {format, pad} from '../lib/format.js';
import {readFloppyFile} from '../lib/read-floppy-file.js';

const FLOPPY_SIZE = 1_474_560;
const SMALL_SIZE = 20_480;

const KERNEL_SIZE = 1646;
const SHELL_SIZE = 1118;

const fill = (size, value) => Buffer.alloc(size, value);

const createFiles = () => ({
    'kernel.bin': fill(KERNEL_SIZE, 1),
    'sh3ll.bin': fill(SHELL_SIZE, 2),
});

test('nirguna: format-floppy: e2e: size: default is a real floppy', async (t) => {
    const floppy = await format({
        env: {},
    });
    
    t.equal(floppy.length, FLOPPY_SIZE);
    t.end();
});

test('nirguna: format-floppy: e2e: size: 20480 gives an image of 20480 bytes', async (t) => {
    const floppy = await format({
        size: SMALL_SIZE,
    });
    
    t.equal(floppy.length, SMALL_SIZE);
    t.end();
});

test('nirguna: format-floppy: e2e: size: two files are read from a small image', async (t) => {
    const files = createFiles();
    const small = await format({
        files,
        size: SMALL_SIZE,
    });
    
    const result = [
        Buffer.from(await readFloppyFile('kernel.bin', small)),
        Buffer.from(await readFloppyFile('sh3ll.bin', small)),
    ];
    
    t.deepEqual(result, [files['kernel.bin'], files['sh3ll.bin']]);
    t.end();
});

test('nirguna: format-floppy: e2e: size: boot record of a small image says 2880 sectors', async (t) => {
    const small = await format({
        size: SMALL_SIZE,
    });
    
    const result = small.readUInt16LE(19);
    const expected = 2880;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: format-floppy: e2e: size: pad of a small image is equal to the real floppy', async (t) => {
    const files = createFiles();
    const small = await format({
        files,
        size: SMALL_SIZE,
    });
    
    const result = pad(small);
    const expected = await format({
        files,
    });
    
    t.deepEqual(result, expected);
    t.end();
});

test('nirguna: format-floppy: e2e: size: two files are read from a padded image', async (t) => {
    const files = createFiles();
    const small = await format({
        files,
        size: SMALL_SIZE,
    });
    
    const full = pad(small);
    const result = [
        Buffer.from(await readFloppyFile('kernel.bin', full)),
        Buffer.from(await readFloppyFile('sh3ll.bin', full)),
    ];
    
    t.deepEqual(result, [files['kernel.bin'], files['sh3ll.bin']]);
    t.end();
});

test('nirguna: format-floppy: e2e: size: pad of an image larger than a floppy throws', (t) => {
    const image = Buffer.alloc(FLOPPY_SIZE + 1);
    const [error] = tryCatch(pad, image);
    
    t.equal(error.message, `image is larger than a floppy: ${FLOPPY_SIZE + 1}`);
    t.end();
});

test('nirguna: format-floppy: e2e: size: pad of a real floppy returns the same object', (t) => {
    const image = Buffer.alloc(FLOPPY_SIZE);
    const result = pad(image);
    
    t.equal(result, image);
    t.end();
});

test('nirguna: format-floppy: e2e: size: files that do not fit in the size throw an error', async (t) => {
    const files = {
        'kernel.bin': fill(2079, 1),
        'sh3ll.bin': fill(SHELL_SIZE, 2),
    };
    
    const [error] = await tryToCatch(format, {
        files,
        size: SMALL_SIZE,
    });
    
    t.equal(error.name, 'RangeError');
    t.end();
});
