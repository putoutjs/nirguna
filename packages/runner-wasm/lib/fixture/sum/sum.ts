export async function sum(a: i64, b: i64): i64 {
    i64.add(local.get(a), local.get(b));
}
