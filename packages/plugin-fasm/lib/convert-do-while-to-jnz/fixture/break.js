do {
    push(cx);
    cx = 0x200;
    pop(cx);
    
    if (ax === 0)
        break;
} while (--cl);
