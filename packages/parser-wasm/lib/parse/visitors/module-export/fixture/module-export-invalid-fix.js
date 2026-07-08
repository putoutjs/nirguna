function add(a: i32): i32 {
    local.get(a);
}

__nirguna_wasm_export('add-two', add, 'func');