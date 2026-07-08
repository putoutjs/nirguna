(module
    (func $x (export "x") (param $a i32) (result i32)
        (if
            (i32.eqz (local.get $a))
            (then
                    (i32.const 1)
            )
 (else
                
                    (i32.const 0)

            )
        )
    )
)
