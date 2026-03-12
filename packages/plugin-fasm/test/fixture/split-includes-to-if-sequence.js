const ignored = [
    LEFT_ALT,
    LEFT_ALT_UP,
    LEFT_CTRL,
    LEFT_CTRL_UP,
];

[].includes();
[a].includes();
notDeclared.includes();

const notArray = getArray();
notArray.includes();

if (ignored.includes(al))
    jmp(again);
