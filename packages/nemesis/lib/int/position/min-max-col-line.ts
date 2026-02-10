import {i8} from '@nirguna/operator-fasm';

let minLine = 0;
let maxLine = 24;

let minCol = 0;
let maxCol = 79;

export function getMinColumn(): i8 {
    return [minCol];
}

// bl=min col,bh-min line
// cl=max col,ch=max line
export function minMaxColLine() {
    [minCol] = bl;
    [maxCol] = cl;
    [minLine] = bh;
    [maxLine] = ch;
}
