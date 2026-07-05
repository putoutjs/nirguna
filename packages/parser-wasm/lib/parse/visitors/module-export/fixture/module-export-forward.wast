(module
    ;; re-exported from the host
    (export "add" (func $add))
    (func $add (param $a i32) (result i32)
        (local.get $a)
    )
)
