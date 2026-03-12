const SHIFT_KEYS = [
    LEFT_SHIFT,
    RIGHT_SHIFT,
];

if (SHIFT_KEYS.includes(al)) {
    [shift] = 1;
    jmp(again);
}
