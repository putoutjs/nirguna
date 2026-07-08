import {createTypeChecker} from '@putout/printer/type-checker';
import {types} from '@putout/babel';
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

const {isProgram} = types;

export const ExpressionStatement = (path, printer) => {
    const {
        print,
        maybe,
        write,
        indent,
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
    
    if (isIndentBefore(path))
        indent();
    
    print('__expression');
    
    if (isNewlineAfter(path))
        print.newline();
};

const isFirst = (path) => {
    if (!isProgram(path.parentPath))
        return false;
    
    return path.parentPath.get('body.0') === path;
};

const isIndentBefore = createTypeChecker([
    ['-: ->', isFirst],
    ['+', isPrev],
    ['+', isNext],
    ['+: parentPath -> BlockStatement'],
    ['+: parentPath.parentPath -> FunctionDeclaration'],
]);

const isNewlineAfter = createTypeChecker([
    ['+', isNext],
    ['+: parentPath -> BlockStatement'],
    ['+: parentPath.parentPath -> FunctionDeclaration'],
]);
