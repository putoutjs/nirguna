import {isNext, isPrev} from '@putout/printer/is';
import {types} from 'putout';
import {
    isWastImport,
    printWasmImport,
} from './print-wasm-import.js';
import {
    isWastMemory,
    printWasmMemory,
} from './print-wasm-memory.js';

const {isFunction} = types;

export const ExpressionStatement = (path, printer) => {
    const {print, maybe} = printer;
    
    const expression = path.get('expression');
    
    if (isWastImport(expression)) {
        printWasmImport(expression, printer);
        maybe.print.breakline(isNext(path));
        
        return;
    }
    
    if (isWastMemory(expression)) {
        printWasmMemory(expression, printer);
        maybe.print.newline(isNext(path));
        
        return;
    }
    
    const surrounded = isNext(path) || isFunction(path.parentPath.parentPath);
    
    maybe.indent(surrounded || isPrev(path));
    print('__expression');
    maybe.print.newline(surrounded);
};
