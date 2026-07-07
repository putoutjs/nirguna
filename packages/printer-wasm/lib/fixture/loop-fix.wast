(module
    (func $x (export "x") (result i32)
        (loop l
            (br_if $l (i32.eqz (i32.const 0)))
            (i32.const 1)        
        )
    )
)
