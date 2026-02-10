export async function entry(a: i64, b: i64): i64 {
    return call(sum, local.get(a), local.get(b));
}
