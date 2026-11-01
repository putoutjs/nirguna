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

export const replace = () => ({
    'function __a(__p) {let __n = 0; while (__p[__n]) __n++; return __n;}': STRING_LENGTH,
    'function __a(__p) {let __n = 0; while (__p[__n]) {__n++;} return __n;}': STRING_LENGTH,
    'function __a(__p) {let __n = 0; while (__p[__n]) {__p[__n] = 0; __n++;}}': CLEAR_BUFFER,
    'function __a(__p, __q) {let __n = 0; while (__p[__n]) {if (__p[__n] !== __q[__n]) return 1; __n++;} return 0;}': STRCMP,
});
