export function x(a: i64): i64 {
    local(b, i64);
    local.set(b, i64.const(3));
    i64.add(local.get(a), local.get(b));
}
