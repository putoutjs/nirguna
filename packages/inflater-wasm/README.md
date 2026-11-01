# @nirguna/inflater-wasm

The stage `inflate` of the `wasm` compile. It has the same contract as `@nirguna/inflater-fasm`. It changes three plain functions to `wasm` loops that read and write bytes in memory. It reports each other read `a[i]` of a parameter.

## Install

```
npm i @nirguna/inflater-wasm
```

## Place in the compile

```
source -> inflate -> transform -> optimize -> print -> translate
```

## Use

```js
import {inflate} from '@nirguna/inflater-wasm';

const [code, places] = inflate(source);
```

| Name | Meaning |
|---|---|
| `source` | The text of the program. |
| `code` | The text for `transform`. If the stage finds nothing, `code` is `source`, byte for byte. |
| `places` | A list of `{message, position: {line, column}}`. A syntax error or an unknown byte read gives a place. If the list is not empty, the compile stops, and `code` is `source`. |

## What the stage does

The stage runs Putout one time with two plugins to find. If there is no place, it returns `source`. Otherwise it runs Putout one more time with the same plugins and fixes the code. If a place is left after the fix, it returns `source` and the places.

| Plugin | Type | Action |
|---|---|---|
| `apply-byte-read` | `replace` | Writes one of three known plain functions as a `wasm` loop. |
| `report-byte-read` | `traverse` | Reports each computed member `a[i]` where `a` is a parameter and no shape changed it. |

The plugin `apply-byte-read` does not write the types. The plugin `apply-types` of `plugin-wasm` types the parameters and the result as `i32` in the stage `transform`.

## Known shapes

| Plain function | Result | Instructions |
|---|---|---|
| `stringLength(str)`: `let n = 0; while (str[n]) n++; return n;` | the length, `i32` | `i32.load8_u` |
| `clearBuffer(buffer)`: `let i = 0; while (buffer[i]) {buffer[i] = 0; i++;}` | none | `i32.load8_u`, `i32.store8` |
| `strcmp(a, b)`: `let i = 0; while (a[i]) {if (a[i] !== b[i]) return 1; i++;} return 0;` | 0 or 1, `i32` | `i32.load8_u`, `i32.ne`, `i32.and` |

The loop of `stringLength` may have a block (`{n++;}`) or not.

The output for the plain `stringLength`:

```text
export function getStringLength(str) {
    local(n, i32);
    b: {
        l: do {
            br_if(b, i32.eqz(i32.load8_u(i32.add(local.get(str), local.get(n)))));
            local.set(n, i32.add(local.get(n), i32.const(1)));
            br(l);
        } while (true);
    }
    local.get(n);
}
```

## A function with no result

The backend has no `void`. The plugin `apply-types` gives the type `i32` to each function that has no result type, and `wasm` then fails with `expected 1 elements on the stack`. The output of `clearBuffer` has the result type `[]` (an empty tuple), so `apply-types` leaves it, and the printer writes a function with no result. This is a way around the limit, not a feature of the backend.

## The result of strcmp

The output of `strcmp` has no second local value. After the loop it computes `a[i] != b[i] and a[i] != 0`. If `a` ended, the result is 0 (the prefix matches, the behavior of `strcmp` in Nemesis). If a byte is different, the result is 1.

## Memory

The source declares the memory by hand: `export const memory = ['memory', 1];`. The stage does not add it.

## Difference from JavaScript

| JavaScript | Compiled code |
|---|---|
| A read past the end of an array gives `undefined`. | A read past the end reads the next byte of memory. |
| A function takes an array or a string. | A function takes the address of the first byte. |

## Limits

1. The stage knows three shapes. A small change of the plain code (a `for` loop, `n += 1`) is not matched, and the backend gives wrong output for it without an error when the code has no read `a[i]` of a parameter.
2. The shapes of `fasm` and `wasm` are written twice and do not share code.

## License

MIT
