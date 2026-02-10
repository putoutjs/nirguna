import {data} from '#operator-wasm';

export const memory = ["memory", 1];

data(0, "Hello World");
data(i32.const(10), "ABC");