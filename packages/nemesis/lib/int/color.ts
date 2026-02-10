let textColor = 2;
let backgroundColor = 0;

export function setBackgroundColor() {
    [backgroundColor] = al;
}

export function getBackgroundColor(): i8 {
    return [backgroundColor];
}

export function getTextColor(): i8 {
    return [textColor];
}

export function setTextColor() {
    [textColor] = al;
}

// 6: в cl textColor, в ch backgroundColor
export function setColor() {
    [textColor] = cl;
    [backgroundColor] = ch;
}

export function getColor(): i8 {
    al = [backgroundColor];
    al <<= 4;
    al += [textColor];
    
    return al;
}
