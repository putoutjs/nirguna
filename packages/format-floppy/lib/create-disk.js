import {FatFsDisk} from 'fatfs-wasm';

export const createDisk = (data) => {
    return new class {
        #disk = null;
        [Symbol.asyncDispose]() {
            this.#disk.unmount();
        }
        
        async use() {
            this.#disk = await FatFsDisk.create(data);
            this.#disk.mount();
            
            return this.#disk;
        }
    }();
};
