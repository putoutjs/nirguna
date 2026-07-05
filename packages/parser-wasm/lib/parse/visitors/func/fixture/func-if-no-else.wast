(module
    (func $x (export "x") (param $a i32)
        (if (i32.eqz (local.get $a))
            (then (return (i32.const 1)))
        )
    )
)
