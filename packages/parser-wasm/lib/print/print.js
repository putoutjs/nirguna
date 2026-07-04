import {print as putoutPrint} from '@putout/printer';

export const print = ([ast, raw]) => {
    if (!ast.body.length)
        return beautify(raw);
    
    const printed = putoutPrint(ast, {
        format: {
            quote: '"',
            endOfFile: '',
        },
    });
    
    return beautify(raw, printed);
};

const beautify = (raw, code = '') => {
    if (!raw.length)
        return code;
    
    return [code, ...raw]
        .filter(Boolean).join('');
};

