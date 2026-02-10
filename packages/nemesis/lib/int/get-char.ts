import {io} from '@nirguna/operator-fasm';

const RIGHT_SHIFT = 0x36;
const LEFT_SHIFT = 0x2a;
const RIGHT_SHIFT_UP = 0x36 + 0x80;
const LEFT_SHIFT_UP = 0x2a + 0x80;

// никаких параметров не принимает.
// в al возвращает ascii код нажатой клавиши
export async function getChar<bx>() {
    again: do {
        io.in(al, 0x60);
    } while (al === 0xfa);
    
    if (al === RIGHT_SHIFT) {
        [shift] = 1;
        jmp(again);
    }
    
    if (al === LEFT_SHIFT) {
        [shift] = 1;
        jmp(again);
    }
    
    //;Скан-коды отпущенного шифта
    if (al === RIGHT_SHIFT_UP) {
        [shift] = 0;
        jmp(again);
    }
    
    if (al === LEFT_SHIFT_UP) {
        [shift] = 0;
        jmp(again);
    }
    
    or([shift], 0);
    jnz(with_shift);
    si = scan_table - 1;
    jmp(symbolwrite);
    with_shift: si = scan_table_shift - 1;
    symbolwrite: cmp(al, 0xe);
    jz(enter_not);
    bl = al;
    bh = 0;
    cmp(bx, 57); //если клавиша отжимается
    jg(again);
    si += bx;
    al = [si];
    end_work: or(al, al);
    jz(again);
    
    enter_not: push(ax);
    al = 1;
    
    io.out(0x60, al);
    
    al = 0x20;
    io.out(0x20, al);
    //;Ожидание несколько милисикунд
    call(wait);
    pop(ax);
}

async function wait() {
    push(cx);
    cx = 0x99;
    
    _loop: push(cx);
    loop($);
    pop(cx);
    loop(_loop);
    pop(cx);
}

//;Данные----------------------------------------------
let shift = 0;

// шифт нажат, или нет?
let scan_table_shift = [
    0x21,
    '!@#$%^&*()_=',
    0x21,
    0x21,
    'QWERTYUIOP{}',
    0xd,
    0x21,
    `ASDFGHJKL:~'`,
    0x21,
    '|ZXCVBNM<>?',
    0x21,
    0x21,
    0x21,
    ' ',
];

let scan_table = [
    0x21,
    '1234567890-=',
    0x21,
    0x21,
    'qwertyuiop[]',
    0xd,
    0x21,
    'asdfghjkl;"`',
    0x21,
    '\\zxcvbnm,./',
    0x21,
    0x21,
    0x21,
    ' ',
];
