const KEYS = {
    '\n': 'ret',
    ' ': 'spc',
    ':': 'shift-semicolon',
    '@': 'shift-2',
};

const isUpper = (a) => a >= 'A' && a <= 'Z';

export const toKey = (key) => {
    if (KEYS[key])
        return KEYS[key];
    
    if (isUpper(key))
        return `shift-${key.toLowerCase()}`;
    
    return key;
};
