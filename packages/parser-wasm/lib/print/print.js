import {print as putoutPrint} from '@putout/printer';
import {ExpressionStatement} from './visitors/expression-statement.js';
import {ReturnStatement} from './visitors/return-statement.js';

const beautify = (raw, code = '') => {
    if (!raw.length)
        return code;
    
    return [code, ...raw]
        .filter(Boolean).join('');
};

export const print = ([ast, raw]) => {
    if (!ast.body.length)
        return beautify(raw);
    
    const printed = putoutPrint(ast, {
        format: {
            quote: '"',
            endOfFile: '',
        },
        visitors: {
            ExpressionStatement,
            ReturnStatement,
        },
    });
    
    return beautify(raw, printed);
};
