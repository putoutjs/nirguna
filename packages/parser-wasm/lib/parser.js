import {print} from './print/print.js';
import {parse as parseWasm} from './parse/parse.js';

export const parse = (source) => {
    const ast = parseWasm(source);
    
    return print(ast);
};
