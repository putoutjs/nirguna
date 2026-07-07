(module
    (type $t (func (param i32)))
    ;; exported
    (export "x" (func $x))
    (func $x (result i32)
        i32.const 0
    )
)
