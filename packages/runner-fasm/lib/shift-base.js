const SHIFTED = {
    ':': ';',
    '@': '2',
};

const isUpper = (a) => a >= 'A' && a <= 'Z';

export const shiftBase = (key) => {
    if (SHIFTED[key])
        return SHIFTED[key];
    
    if (isUpper(key))
        return key.toLowerCase();
    
    return '';
};
