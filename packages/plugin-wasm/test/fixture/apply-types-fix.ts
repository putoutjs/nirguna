export async function add(a: i32, b: i32, c: i32) {
    return i32.add(i32.add(local.get(a), local.get(b)), local.get(c));
}

export async function add1(a: x, b: i32, c: i32) {
    return i32.add(i32.add(local.get(a), local.get(b)), local.get(c));
}
