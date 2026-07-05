__nirguna_wasm_import('console', 'log', function log(name: i32, message: f64) {return i32});

export function x(a: i32, b: i32): i32 {
    i32.add(local.get(a), local.get(b));
    call(log);
}
