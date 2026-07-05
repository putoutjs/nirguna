(module
    (func $compare2 (export "compare2") (param $a i32) (result i32)
        (if
            (i32.eq (i32.const 10) (local.get $a))
            (then
                (return (i32.const 5))
            )
            (else
                (return (i32.const 10))
            )
        )
    )
)
