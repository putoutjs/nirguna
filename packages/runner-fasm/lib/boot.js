import {readFileSync} from 'node:fs';
import {promisify} from 'node:util';
import {unzip} from 'node:zlib';
import {setTimeout} from 'node:timers/promises';
import {V86} from 'v86';

const extract = promisify(unzip);

const DEBUG_PORT = 0xe9;

const SEABIOS_PATH_ZIP = new URL('../bios/seabios.bin.zip', import.meta.url).pathname;
const VGABIOS_PATH_ZIP = new URL('../bios/vgabios.bin.zip', import.meta.url).pathname;

const seabiosZip = readFileSync(SEABIOS_PATH_ZIP);
const vgabiosZip = readFileSync(VGABIOS_PATH_ZIP);

const toArrayBuffer = (binary) => {
    return binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength);
};

export const boot = async (binary) => {
    const bootloader = toArrayBuffer(binary);
    const seabios = toArrayBuffer(await extract(seabiosZip));
    const vgabios = toArrayBuffer(await extract(vgabiosZip));
    
    return await run({
        bootloader,
        seabios,
        vgabios,
    });
};

function run({bootloader, seabios, vgabios} = {}) {
    return new Promise((resolve) => {
        const emulator = new V86({
            wasm_path: new URL('../../../node_modules/v86/build/v86.wasm', import.meta.url).pathname,
            bios: {
                buffer: seabios,
            },
            vga_bios: {
                buffer: vgabios,
            },
            fda: {
                buffer: bootloader,
            },
            autostart: true,
        });
        
        let output = '';
        
        emulator.bus.register('emulator-started', () => {
            let prevLength = 0;
            
            emulator.v86.cpu.io.register_write(DEBUG_PORT, this, async (byte) => {
                output += String.fromCharCode(byte);
                prevLength = output.length;
                
                await setTimeout(1000);
                
                if (prevLength === output.length) {
                    emulator.stop();
                    resolve(output);
                }
            });
        });
    });
}

