(module
    (func $x (export "x") (result i32)
        (block $b 
            (i32.const 1)
            (br $b)
        )
        (i32.const 0)
    )
)
