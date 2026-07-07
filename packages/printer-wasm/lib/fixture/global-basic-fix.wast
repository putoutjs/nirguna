(module
    (global $g (mut i32) (i32.const 0))
    (func $x (export "x") (result i32)
        (global.get $g)
    )
)
