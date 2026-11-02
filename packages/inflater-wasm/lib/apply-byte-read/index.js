export const report = () => `Apply: byte read`;

const STRING_LENGTH = `function __a(__p) {
    local(__n, i32);
    b: {
        l: do {
            br_if(b, i32.eqz(i32.load8_u(i32.add(local.get(__p), local.get(__n)))));
            local.set(__n, i32.add(local.get(__n), i32.const(1)));
            br(l);
        } while (true);
    }
    local.get(__n);
}`;

const CLEAR_BUFFER = `function __a(__p): [] {
    local(__n, i32);
    b: {
        l: do {
            br_if(b, i32.eqz(i32.load8_u(i32.add(local.get(__p), local.get(__n)))));
            i32.store8(i32.add(local.get(__p), local.get(__n)), i32.const(0));
            local.set(__n, i32.add(local.get(__n), i32.const(1)));
            br(l);
        } while (true);
    }
}`;

const STRCMP = `function __a(__p, __q) {
    local(__n, i32);
    b: {
        l: do {
            br_if(b, i32.eqz(i32.load8_u(i32.add(local.get(__p), local.get(__n)))));
            br_if(b, i32.ne(i32.load8_u(i32.add(local.get(__p), local.get(__n))), i32.load8_u(i32.add(local.get(__q), local.get(__n)))));
            local.set(__n, i32.add(local.get(__n), i32.const(1)));
            br(l);
        } while (true);
    }
    i32.and(i32.ne(i32.load8_u(i32.add(local.get(__p), local.get(__n))), i32.load8_u(i32.add(local.get(__q), local.get(__n)))), i32.ne(i32.load8_u(i32.add(local.get(__p), local.get(__n))), i32.const(0)));
}`;

const HEX_TO_DEC = `function __a(__p) {
    if (i32.and<i32>(i32.ge_u(local.get(__p), i32.const(0x30)), i32.le_u(local.get(__p), i32.const(0x40))))
        i32.sub(local.get(__p), i32.const(0x30));
    else if (i32.or<i32>(i32.le_u(local.get(__p), i32.const(0x61)), i32.ge_u(local.get(__p), i32.const(0x66))))
        i32.const(0x10);
    else
        local.get(__p);
}`;

export const replace = () => ({
    'function __a(__p) {let __n = 0; while (__p[__n]) __n++; return __n;}': STRING_LENGTH,
    'function __a(__p) {let __n = 0; while (__p[__n]) {__n++;} return __n;}': STRING_LENGTH,
    'function __a(__p) {let __n = 0; while (__p[__n]) {__p[__n] = 0; __n++;}}': CLEAR_BUFFER,
    'function __a(__p, __q) {let __n = 0; while (__p[__n]) {if (__p[__n] !== __q[__n]) return 1; __n++;} return 0;}': STRCMP,
    'function __a(__p) {if (__p >= 0x30 && __p <= 0x40) return __p - 0x30; if (__p <= 0x61 || __p >= 0x66) return 0x10; return __p;}': HEX_TO_DEC,
});
