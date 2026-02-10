import {i8} from '@nirguna/operator-fasm';

let line = 3;

export function getLine(): i8 {
    return [line];
}

export function incLine() {
    [
        ++line,
    ];
}

export function decLine() {
    [
        --line,
    ];
}

export function setLine() {
    [line] = bh;
}
