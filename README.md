# Nirguna [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL] [![DeepScan][DeepScanIMGURL]][DeepScanURL]

[NPMURL]: https://npmjs.org/package/nirguna "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/nirguna.svg?style=flat&longCache=true
[BuildStatusURL]: https://github.com/putoutjs/nirguna/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/putoutjs/nirguna/workflows/Node%20CI/badge.svg
[CoverageURL]: https://coveralls.io/github/putoutjs/nirguna?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/putout/nirguna/badge.svg?branch=master&service=github
[DeepScanURL]: https://deepscan.io/dashboard#view=project&tid=16903&pid=20211&bid=545558
[DeepScanIMGURL]: https://deepscan.io/api/teams/16903/projects/20211/branches/545558/badge/grade.svg


![nirguna](https://github.com/putoutjs/nirguna/blob/master/images/nirguna.jpg)

> Nirguna (Sanskrit: निर्गुण) refers to the supreme, ultimate reality (Brahman) in Hinduism and other Indian philosophies as being without form, material attributes, or limitations (derived from nir, meaning "without," and guna, meaning "quality" or "attribute"). It signifies a transcendental, non-dual, and ineffable state of being.

Compile JavaScript to WASM and Fasm.

<img width="300" alt="image" src="https://github.com/user-attachments/assets/e3808fa0-90cc-4e9f-acb3-68babafa0350" />

## Install

```
npm i nirguna -g
```

## Usage Example

Let's suppose you have JavaScript:

```js
function add() {
    const eax = 1;
    const ebx = 2;
    
    return eax + ebx;
}
```

You can compile it to fasm and wasm.

### Fasm

Let's compile javascript with:

```sh
nirguna --target fasm example/fn.ts -o code
```

To intermediate representation:

```js
__nirguna_add: {
    mov(eax, 0x1);
    mov(ebx, 0x2);
    add(eax, ebx);
    ret;
}
```

Also we can compile it with:

```sh
nirguna -t fasm example/fn.ts -o code
```

to assembly representation with:

```asm
__nirguna_add:
mov eax, 0x1
mov ebx, 0x2
add eax, ebx
ret
```

Also we can compile it to binary representation with `nirguna fasm example/fn.ts`:

```sh
$ hexdump example/fn.bin

0000000 b866 0001 0000 bb66 0002 0000 0166 c3d8
0000010
```

### wasm

Let's suppose we have absolutely valid JavaScript file with types, which we can run with node v24.

```ts
import {create} from '#nirguna';

export const stack = [];

export const imports = [
    ['console', 'log', function log() {
        return i32;
    }],
];

const {
    i32,
    local,
    call,
} = create({
    stack,
    imports,
});

export function x(a: i32, b: i32): i32 {
    i32.add(local.get(a), local.get(b));
    call('log');
}
```

Compiled with `nirguna 1.wast.ts` to `1.wast`:

```wast
(module
    (import "console" "log" (func $log (param $message i32) (result i32)))
    (func $x (export "x") (param $a i32) (param $b i32) (result i32)
        (i32.add (local.get $a) (local.get $b))
        (call $log)
    )
)
```

With:

```js
import {compile} from 'nirguna/lib/nirguna.spec';

const wast = compile(wastts);
const binary = await translate(wast);

const {x} = run(binary, {
    console: {
        log: (a) => {
            console.log(a);
            return a;
        },
    },
});

x(1, 2);
// outputs
3;
```

## License

MIT
