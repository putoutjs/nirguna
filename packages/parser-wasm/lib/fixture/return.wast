(module
    (func $x (export "x") (param $a i32) (result i32)
        (return (i32.add $a $a))
    )
)
