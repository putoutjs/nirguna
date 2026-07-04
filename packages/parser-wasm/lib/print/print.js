import {print as putoutPrint} from '@putout/printer';
import {ExpressionStatement} from './visitors/expression-statement.js';
import {ReturnStatement} from './visitors/return-statement.js';

export const print = ([ast, raw]) => {
    if (ast.body.length) {
        const printed = putoutPrint(ast, {
            format: {
                quote: '"',
            },
            visitors: {
                ExpressionStatement,
                ReturnStatement,
            },
        });
        
        return [
            printed.trimEnd(),
            ...raw,
        ]
            .filter(Boolean)
            .join('\n\n');
    }
    
    return ['', ...raw]
        .filter(Boolean)
        .join('\n\n');
};
