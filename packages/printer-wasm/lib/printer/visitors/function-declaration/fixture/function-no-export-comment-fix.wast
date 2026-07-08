(module
    ;; standalone function
    (func $add (param $a i32) (result i32)
        (local $eax i32)
        (i32.add (local.get $eax) (i32.const 1))
    )
)
