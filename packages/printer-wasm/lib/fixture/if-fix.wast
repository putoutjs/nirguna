(module
    (func $thenElse (export "thenElse") (param $a i32) (result i32)
        (if
            (i32.eq (local.get $a) (i32.const 10))
            (then
                (return (i32.const 1))
            )
        )
        (i32.const 0)
    )
)
