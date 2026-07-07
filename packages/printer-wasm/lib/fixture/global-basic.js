let g: i32 = i32.const(0);

export function x(): i32 {
    global.get(g);
}
