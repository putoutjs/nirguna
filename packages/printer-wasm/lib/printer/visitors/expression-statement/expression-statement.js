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
import {isWastTable, printWasmTable} from './print-wasm-table.js';
import {isWastElem, printWasmElem} from './print-wasm-elem.js';

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
        return;
    }
    
    if (isWastMemory(expression)) {
        printWasmMemory(expression, printer);
        return;
    }
    
    if (isWastExport(expression)) {
        printWasmExport(expression, printer);
        return;
    }
    
    if (isWastTable(expression)) {
        printWasmTable(expression, printer);
        return;
    }
    
    if (isWastElem(expression)) {
        printWasmElem(expression, printer);
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
