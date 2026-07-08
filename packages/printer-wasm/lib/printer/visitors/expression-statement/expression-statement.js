import {createTypeChecker} from '@putout/printer/type-checker';
import {isNext, isPrev} from '#is';
import {
    isWastImport,
    printWasmImport,
} from './print-wasm-import.js';
import {
    isWastMemory,
    printWasmMemory,
} from './print-wasm-memory.js';
import {
    isWastExport,
    printWasmExport,
} from './print-wasm-export.js';

export const ExpressionStatement = (path, printer) => {
    const {
        print,
        maybe,
        write,
    } = printer;
    
    const {leadingComments} = path.node;
    
    if (leadingComments)
        for (const comment of leadingComments) {
            write(';; ');
            write(comment.value.trimStart());
            write.breakline();
        }
    
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
    
    if (isWastExport(expression)) {
        printWasmExport(expression, printer);
        maybe.print.newline(isNext(path));
        
        return;
    }
    
    const surrounded = isSurrounded(path);
    
    maybe.indent(surrounded);
    print('__expression');
    maybe.print.newline(surrounded);
};

const isSurrounded = createTypeChecker([
    ['+', isPrev],
    ['+', isNext],
    ['+: parentPath -> BlockStatement'],
    ['+: parentPath.parentPath -> FunctionDeclaration'],
]);

