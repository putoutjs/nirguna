// standalone function
function add(a: i32): i32 {
    local(eax, i32);
    i32.add(local.get(eax), i32.const(1));
}
