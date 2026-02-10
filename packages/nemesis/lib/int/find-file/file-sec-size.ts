import {i8} from '@nirguna/operator-fasm';

let file_sec_size = 0;

export const getFileSecSize = (): i8 => {
    return [file_sec_size];
};

export const setFileSecSize = () => {
    [file_sec_size] = al;
};
