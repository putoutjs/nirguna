import {print as putoutPrint} from '@putout/printer';

export const print = (ast) => {
    return putoutPrint(ast, {
        format: {
            endOfFile: '',
        },
    });
};
