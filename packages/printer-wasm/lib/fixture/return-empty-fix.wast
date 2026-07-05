(module
    (func $compare (export "compare") (param $eax)
        (if
            (local.get $eax)
            (then
                (return)
            )
        )
    )
)
