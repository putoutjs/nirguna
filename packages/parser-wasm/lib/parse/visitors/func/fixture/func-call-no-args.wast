(module
    (func $one (result i32)
        (i32.const 1)
    )
    (func $oneTwo (result i32)
        (call $one)
    )
)
