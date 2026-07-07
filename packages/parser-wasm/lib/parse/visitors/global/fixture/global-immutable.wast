(module
    (global $c i32 (i32.const 42))
    (func $x (export "x") (result i32)
        (global.get $c)
    )
)