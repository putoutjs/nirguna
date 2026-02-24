function sum(a, b, c, d) {
    return i32.add(i32.add(i32.add(local.get(a), local.get(b)), local.get(c)), local.get(d));
}

function sum2(a, b) {
    return i32.add(local.get(a), local.get(b));
}
