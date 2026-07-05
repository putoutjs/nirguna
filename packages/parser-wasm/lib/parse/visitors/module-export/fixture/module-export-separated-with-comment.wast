(module
    (func $x (param $a i32))
    ;; exposed to the host
    (export "add" (func $x))
)
