import {Buffer} from 'node:buffer';
import process from 'node:process';
import {unzip} from 'node:zlib';
import {promisify} from 'node:util';
import {readFileSync} from 'node:fs';
import {createDisk} from './create-disk.js';

const extract = promisify(unzip);
const PACKED = readFileSync(new URL('../data/fat-small.img.zip', import.meta.url).pathname);

const {entries} = Object;

export const FLOPPY_SIZE = 1_474_560;

export const pad = (image) => {
    if (image.length > FLOPPY_SIZE)
        throw Error(`image is larger than a floppy: ${image.length}`);
    
    if (image.length === FLOPPY_SIZE)
        return image;
    
    const full = Buffer.alloc(FLOPPY_SIZE);
    
    full.set(image);
    
    return full;
};

export const format = async ({boot, files = {}, size, env = process.env}) => {
    const template = await extract(PACKED);
    const data = Buffer.alloc(size || Number(env.NIRGUNA_FORMAT_SIZE) || FLOPPY_SIZE);
    
    template.copy(data);
    await using disk = createDisk(data);
    const floppy = await disk.use();
    
    for (const [name, buffer] of entries(files)) {
        floppy.writeFile(`/${name}`, buffer);
    }
    
    if (!boot)
        return data;
    
    boot.copy(data);
    
    return data;
};
