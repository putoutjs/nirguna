(module
    (func $add (param $a i32) (param $b i32)
        (i32.add $a $b)
    )
    (export "add" (func $add))
)
