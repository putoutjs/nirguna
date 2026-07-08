(module
    (func $compare (export "compare") (param $eax i32) (result i32)
        (i32.eq (local.get $eax) (i32.const 0))
    )
    (func $compare2 (export "compare2") (param $eax i32) (result i32)
        (i32.eq (local.get $eax) (i32.const 0))
    )
)
