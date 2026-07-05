// adds two numbers
export function x(a: i32, b: i32): i32 {
    i32.add(local.get(a), local.get(b));
    call(log);
}
