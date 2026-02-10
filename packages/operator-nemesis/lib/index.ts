import {rb} from '@nirguna/operator-fasm';

const noop = () => {};

type ScreenSize = {
    columns: number[2];
    lines: number[2];
};
type GetsArgs = {
    size: number;
    buffer: rb;
};
type SetColorArgs = {
    color: number;
    background: number;
};
type Sector = {
    count: unknown;
    buffer: unknown;
    sector: unknown;
    track: unknown;
    head: unknown;
};

export const nemesis = {
    gets: (getsArgs: GetsArgs) => {},
    getChar: () => {},
    printf: (message: unknown | number | string | (string | number)[]) => {},
    exec: (name: string) => {},
    clearScreen: noop,
    setScreenSize: (size: ScreenSize) => {},
    setColor: (setColorArgs: SetColorArgs) => {},
    findFirst: (index: number | number[]) => 0,
    findFile: (index: unknown) => 0,
    readSector: (sector: Sector) => 0,
};
