export function hexToDec(hex) {
    if (i32.and<i32>(i32.ge_u(local.get(hex), i32.const(0x30)), i32.le_u(local.get(hex), i32.const(0x40))))
        i32.sub(local.get(hex), i32.const(0x30));
    else if (i32.or<i32>(i32.le_u(local.get(hex), i32.const(0x61)), i32.ge_u(local.get(hex), i32.const(0x66))))
        i32.const(0x10);
    else
        local.get(hex);
}
