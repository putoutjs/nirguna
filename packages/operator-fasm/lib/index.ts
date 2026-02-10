export * from './globals.ts';
export type rb = number;

export type ureg = Promise<number>;

export type i16 = number;

export type i32 = number;

export type i8 = number | number[];

export type iret = Promise<number>;

const noop = () => {};

export const use32 = () => {};
export const use16 = () => {};
export const bios = {
    reboot: noop,
};
export const io = {
    in: (a, b) => a + b,
    out: (a, b) => a + b,
};
export const debug = (a: string) => a;
export const org = (a: number) => a;
