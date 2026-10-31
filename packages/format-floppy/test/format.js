import {Buffer} from 'node:buffer';
import {test} from 'supertape';
import {tryCatch} from 'try-catch';
import {
    format,
    pad,
    FLOPPY_SIZE,
} from '../lib/format.js';
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

test('nirguna: format-floppy: size: variable', async (t) => {
    const floppy = await format({
        env: {
            NIRGUNA_FORMAT_SIZE: '20480',
        },
    });
    
    t.equal(floppy.length, 20_480);
    t.end();
});

test('nirguna: format-floppy: size: option has priority over the variable', async (t) => {
    const floppy = await format({
        size: 40_960,
        env: {
            NIRGUNA_FORMAT_SIZE: '20480',
        },
    });
    
    t.equal(floppy.length, 40_960);
    t.end();
});

test('nirguna: format-floppy: size: variable is not a number', async (t) => {
    const floppy = await format({
        env: {
            NIRGUNA_FORMAT_SIZE: 'small',
        },
    });
    
    t.equal(floppy.length, FLOPPY_SIZE);
    t.end();
});

test('nirguna: format-floppy: size: default', async (t) => {
    const floppy = await format({
        env: {},
    });
    
    t.equal(floppy.length, FLOPPY_SIZE);
    t.end();
});

test('nirguna: format-floppy: pad: small image', (t) => {
    const small = Buffer.from('hello');
    const full = pad(small);
    const result = full.subarray(0, small.length);
    
    t.deepEqual(result, small);
    t.end();
});

test('nirguna: format-floppy: pad: real floppy', (t) => {
    const image = Buffer.alloc(FLOPPY_SIZE);
    const result = pad(image);
    const expected = image;
    
    t.equal(result, expected);
    t.end();
});

test('nirguna: format-floppy: pad: larger than a floppy', (t) => {
    const image = Buffer.alloc(FLOPPY_SIZE + 1);
    const [error] = tryCatch(pad, image);
    
    t.equal(error.message, `image is larger than a floppy: ${FLOPPY_SIZE + 1}`);
    t.end();
});
