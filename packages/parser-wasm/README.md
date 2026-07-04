# @nirguna/parser-wasm

Parse text representation of `wasm` to JavaScript:

## Install

```
npm i @nirguna/parser-wasm
```

## API

Input:

```wast
(module
    (func $x (export "x") (param $a i32) (param $b i32) (result i32)
        (i32.add $a $b)
    )
)
```

Output:

```ts
export function x(a: i32, b: i32): i32 {
    i32.add(a, b);
}
```

## License

MIT
