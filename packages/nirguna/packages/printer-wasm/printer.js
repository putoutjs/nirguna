import {parse} from 'putout';
import * as printer from './printer/printer.js';

export const print = (source) => {
    const ast = parse(source, {
        isTS: true,
    });
    
    return printer.print(ast);
};
