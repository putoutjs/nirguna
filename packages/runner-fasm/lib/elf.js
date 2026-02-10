import {Buffer} from 'node:buffer';

const ELF = Buffer.from([
    0x7F,
    0x45,
    0x4C,
    0x46,
]);

export const isELF = (binary) => {
    const signature = Buffer.from(binary.slice(0, 4));
    return !Buffer.compare(signature, ELF);
};
