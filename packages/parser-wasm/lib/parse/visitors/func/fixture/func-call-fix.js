export function double(a: i32): i32 {
    i32.add(a, a);
}

export function quadruple(a: i32): i32 {
    double(double(local.get(a)));
}