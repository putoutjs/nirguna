async function execute() {
    await debugPort(__debug_1_hello_world);
}

let __debug_1_hello_world = [
    'hello world',
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
