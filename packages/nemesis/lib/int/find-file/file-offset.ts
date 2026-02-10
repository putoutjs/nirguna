import {i16} from '@nirguna/operator-fasm';

let file_offset: i16 = 0;

export const getFileOffset = () => {
    return [file_offset];
};

export const setFileOffset = () => {
    [file_offset] = ax;
};
