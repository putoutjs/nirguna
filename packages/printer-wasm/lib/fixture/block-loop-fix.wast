(module
    (func $x (export "x") (param $a i32) (result i32)
        (block $b 
            (loop $l
                (br_if $b (i32.eqz (local.get $a)))
                (br $l)
            )
            (i32.const 1)
        )
    )
)
