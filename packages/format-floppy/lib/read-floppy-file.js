import {createDisk} from './create-disk.js';

export const readFloppyFile = async (name, data) => {
    await using disk = createDisk(data);
    const floppy = await disk.use();
    
    return floppy.readFile(`/${name}`);
};
