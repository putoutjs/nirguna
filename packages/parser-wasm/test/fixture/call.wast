(module
    (func $double (param $a i32) (result i32)
        (i32.add $a $a)
    )
    (func $quadruple (export "quadruple") (param $a i32) (result i32)
        (call $double (call $double (local.get $a)))
    )
)
