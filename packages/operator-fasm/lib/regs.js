export const REGS_64BIT = [
    'rax',
    'rbx',
    'rcx',
    'rdx',
    'rsi',
    'rdi',
    'rbp',
    'rsp',
    'r8',
    'r9',
    'r10',
    'r11',
    'r12',
    'r13',
    'r14',
    'r15',
];

export const REGS_32BIT = [
    'eax',
    'ebx',
    'ecx',
    'edx',
    'esi',
    'edi',
    'ebp',
    'esp',
    'r8d',
    'r9d',
    'r10d',
    'r11d',
    'r12D',
    'r13d',
    'r14d',
    'r15d',
];

export const REGS_16BIT = [
    'ax',
    'bx',
    'cx',
    'dx',
    'si',
    'di',
    'bp',
    'sp',
    'r8w',
    'r9w',
    'r10w',
    'r11w',
    'r12W',
    'r13w',
    'r14w',
    'r15w',
];

export const REGS_8BIT = [
    'al',
    'ah',
    'bl',
    'bh',
    'cl',
    'ch',
    'dl',
    'dh',
    'sil',
    'dil',
    'bpl',
    'spl',
    'r8b',
    'r9b',
    'r10b',
    'r11b',
    'r12B',
    'r13b',
    'r14b',
    'r15b',
];

const segment = [
    // Сегментные регистры
    'cs',
    'ds',
    'es',
    'fs',
    'gs',
    'ss',
];

export const regs = [
    ...REGS_64BIT,
    ...REGS_32BIT,
    ...REGS_16BIT,
    ...REGS_8BIT,
    ...segment,
];

export const isRegister = (a) => regs.includes(a);

export const is8bit = (name) => {
    return REGS_8BIT.includes(name);
};

export const is16bit = (name) => {
    return REGS_16BIT.includes(name);
};

export const is32bit = (name) => {
    return REGS_32BIT.includes(name);
};

export const is64bit = (name) => {
    return REGS_64BIT.includes(name);
};
