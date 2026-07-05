(module
    (func $compare2 (export "compare2") (param $a i32) (result i32)
        (if
            (i32.eq (i32.const 10) (local.get $a))
            (then
                (i32.const 5)
            )
            (else
                (i32.const 10)
            )
        )
    )
)
