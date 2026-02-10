import {unzip} from 'node:zlib';
import {promisify} from 'node:util';
import {readFileSync} from 'node:fs';
import {createDisk} from './create-disk.js';

const extract = promisify(unzip);
const PACKED = readFileSync(new URL('../data/fat-small.img.zip', import.meta.url).pathname);

const {entries} = Object;

export const format = async ({boot, files = {}}) => {
    const data = await extract(PACKED);
    await using disk = createDisk(data);
    const floppy = await disk.use();
    
    for (const [name, buffer] of entries(files)) {
        floppy.writeFile(`/${name}`, buffer);
    }
    
    boot?.copy(data);
    
    return data;
};
