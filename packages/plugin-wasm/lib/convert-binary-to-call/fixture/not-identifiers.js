function sum(a, b, c, d) {
    return a + b + c + local.get(d);
}

function sum2(a, b) {
    return a + local.get(b);
}
