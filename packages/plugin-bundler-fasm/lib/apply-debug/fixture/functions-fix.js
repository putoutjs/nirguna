async function execute() {
    await debugPort(__debug_1_hello_world_abcd_e);
}

let __debug_1_hello_world_abcd_e = [
    'hello world abcd e :)!',
    0xa,
];

async function debugPort(name) {
    pusha();
    ax = 0;
    ds = ax;
    si = name;
    lodsb();
    while (al) {
        io.out(233, al);
        lodsb();
    }
    
    popa();
}
