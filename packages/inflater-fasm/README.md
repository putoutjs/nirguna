# @nirguna/inflater-fasm

The stage `inflate` of the `fasm` compile. It changes a plain function to the form with `ureg` that the stage `transform` reads.

## Install

```
npm i @nirguna/inflater-fasm
```

## Place in the compile

```
source -> bundle -> inflate -> transform -> optimize -> print -> translate
```

The stage `inflate` runs after `bundle` and before `transform`. The stage `transform` is not changed.

## Use

```js
import {inflate} from '@nirguna/inflater-fasm';

const [code, places] = inflate(source);
```

| Name | Meaning |
|---|---|
| `source` | The text that `bundle` returns. |
| `code` | The text for `transform`. If the stage finds no known function, `code` is `source`, byte for byte. |
| `places` | A list of `{message, position: {line, column}}`. A syntax error gives one place. If the list is not empty, the compile stops. |

## What the stage does

The stage runs Putout one time to find a known shape. If there is none, it returns `source`. If there is one, it runs Putout one more time with two plugins. Each plugin is a step.

| Step | Plugin | Action |
|---|---|---|
| analyze | `analyze-registers` | Reads a function. If the function has a known shape, it writes the chosen registers on the function as a directive, for example `'reg string-length str=si n=cx'`. |
| apply | `apply-registers` | Reads the directive. Writes the function in the form with `ureg`. Removes the directive. |

Putout repeats its pass while the code changes. In the first pass the step `analyze` writes the directive. In the next pass the step `apply` reads it. The directive stays on the function between the two steps. A table outside the tree can become wrong when another plugin changes the tree. A directive moves with the function.

The directive has the form `reg <shape> <value>=<register> ...`. A register `-` means that the value does not exist in the output. A list of registers (`di,si`) means that the value is in more than one register.

## Known shapes

The known shapes are in `lib/shapes.js`. Each shape has a name, the templates that match it, the parameters, the registers of the values, and the text of the output. To add a shape, add one entry and its fixtures. The plugins do not change.

The stage changes a function only when its body has exactly the shape. Any other function stays as it is.

### string-length

```js
function stringLength(str) {
    let n = 0;
    
    while (str[n])
        n++;
    
    return n;
}
```

The loop may have a block (`{n++;}`) or not. `str` must be a parameter. The output:

```text
async function stringLength(str): ureg {
    let usi = str;
    let ucx = 0;
    
    cld();
    while (lodsb()) {
        ++ucx;
    }
    
    return ucx;
}
```

### clear-buffer

```js
function clearBuffer(buffer) {
    let i = 0;
    
    while (buffer[i]) {
        buffer[i] = 0;
        i++;
    }
}
```

The output:

```text
async function clearBuffer(buffer) {
    di = buffer;
    si = buffer;
    while (lodsb()) {
        al = 0;
        stosb();
    }
}
```

### strcmp

```js
function strcmp(a, b) {
    let i = 0;
    
    while (a[i]) {
        if (a[i] !== b[i])
            return 1;
        
        i++;
    }
    
    return 0;
}
```

The function compares `a` with `b` up to the zero byte of `a`. If `b` is longer and starts with `a`, the result is 0. This is the behavior of `strcmp` in Nemesis. The output:

```text
async function strcmp(a, b): ureg {
    let uax = 0;
    let usi = a;
    let udi = b;
    
    cld();
    while (lodsb()) {
        if (al !== [udi]) {
            al = 1;
            break;
        }
        
        ++udi;
    }
    
    return uax;
}
```

The stage gives no error for code that it does not know. This includes the assembler functions of Nemesis. A check "unknown code is an error" needs a marker in the source. There is no marker yet.

## Registers

| Value | Register | Reason |
|---|---|---|
| The parameter that the loop reads | `si` | `lodsb` reads a byte through `si` and moves it. |
| The counter | `cx` | The counter register of the machine. |
| The byte that the loop reads | `al` | `lodsb` puts the byte in `al`. |
| The result | `ax` | The ABI of Nirguna returns a value in `ax`. |

The stage writes `usi` and `ucx`. These are universal registers. The directive `use 16`, `use 32` or `use 64` gives the width.

## Difference from JavaScript

The plain function runs as JavaScript. It does not mean the same in the compiled code.

| JavaScript | Compiled code |
|---|---|
| `str[n]` on a string is a string of one character. | `str[n]` is one byte. |
| A read past the end of an array gives `undefined`. | A read past the end reads the next byte of memory. |
| `n` is a number with a fraction. | `n` is an integer of the width of the register. |

To test the plain function in JavaScript, give it a `Uint8Array` with a zero byte at the end.

## Limits

1. The stage knows three shapes (`string-length`, `clear-buffer`, `strcmp`).
2. The stage reads parameters and local values of the types that this shape needs. It has no allocator for many values.
3. The registers in the directive are a record. The step `apply` reads the names of the parameters from it, and it writes the `body` of the shape.
4. The labels of the loops come from line numbers. The text of the stage output is parsed again by `transform`, so every node has a line.

## License

MIT
