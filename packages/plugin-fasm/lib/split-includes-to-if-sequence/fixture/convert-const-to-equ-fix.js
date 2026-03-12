[].includes();
[a].includes();
notDeclared.includes();

notArray.equ = getArray();
notArray.includes();

{
    if (al === LEFT_ALT)
        jmp(again);
    
    if (al === LEFT_ALT_UP)
        jmp(again);
    
    if (al === LEFT_CTRL)
        jmp(again);
    
    if (al === LEFT_CTRL_UP)
        jmp(again);
}
