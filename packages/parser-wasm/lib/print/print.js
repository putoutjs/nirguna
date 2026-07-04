import {print as putoutPrint} from '@putout/printer';

export const print = (ast) => {
    if (!ast.body.length)
        return '';
    
    return putoutPrint(ast, {
        format: {
            quote: '"',
            endOfFile: '',
        },
    });
};
