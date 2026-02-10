import {i8} from '@nirguna/operator-fasm';

let col = 0;

export function getColumn(): i8 {
    return [col];
}

export function incColumn() {
    [
        ++col,
    ];
}

export function decColumn() {
    [
        --col,
    ];
}

export function setColumn() {
    [col] = bl;
}
