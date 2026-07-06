function one(): i32 {
    i32.const(1);
}

function oneTwo(): i32 {
    call(one);
    i32.const(2);
}

__nirguna_wasm_export('theAnswer', oneTwo);