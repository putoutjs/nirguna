import {isNext, exists} from '@putout/printer/is';
import {isJmpFar, printJmpFar} from './print-jmp-far.js';
import {isInOut, printInOut} from './print-in-out.js';

export const ExpressionStatement = (path, printer) => {
    const {
        maybe,
        print,
        indent,
        traverse,
    } = printer;
    
    const expression = path.get('expression');
    
    if (isJmpFar(expression)) {
        printJmpFar(expression, printer);
        maybe.print.breakline(isNext(path));
        
        return;
    }
    
    if (isInOut(expression)) {
        printInOut(expression, printer);
        print.breakline();
        
        return;
    }
    
    indent();
    traverse(expression);
    
    const next = path.getNextSibling();
    maybe.print.newline(exists(next));
};
