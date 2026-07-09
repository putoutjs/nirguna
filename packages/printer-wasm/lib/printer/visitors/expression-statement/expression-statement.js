import {createTypeChecker} from '@putout/printer/type-checker';
import {types} from '@putout/babel';
import {
    isNext,
    isPrev,
    callWithNext,
    callWithPrev,
    isInsideProgram,
} from '#is';
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

const {
    isProgram,
    isFunctionDeclaration,
    isExpressionStatement,
} = types;

export const ExpressionStatement = (path, printer) => {
    const {
        print,
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
    
    if (shouldIndentBefore(path))
        indent();
    
    const expression = path.get('expression');
    
    if (isWastImport(expression)) {
        printWasmImport(expression, printer);
        maybeNewlineAfter(path, printer);
        
        return;
    }
    
    if (isWastMemory(expression)) {
        printWasmMemory(expression, printer);
        maybeNewlineAfter(path, printer);
        
        return;
    }
    
    if (isWastExport(expression)) {
        printWasmExport(expression, printer);
        maybeNewlineAfter(path, printer);
        
        return;
    }
    
    if (isWastTable(expression)) {
        printWasmTable(expression, printer);
        maybeNewlineAfter(path, printer);
        
        return;
    }
    
    if (isWastElem(expression)) {
        printWasmElem(expression, printer);
        maybeNewlineAfter(path, printer);
        
        return;
    }
    
    print('__expression');
    maybeNewlineAfter(path, printer);
};

const isFirst = (path) => {
    if (!isProgram(path.parentPath))
        return false;
    
    return path.parentPath.get('body.0') === path;
};

const isPrevFunctionDeclaration = callWithPrev(isFunctionDeclaration);
const isProgramPrevFunctionDeclaration = (path) => isInsideProgram(path) && isPrevFunctionDeclaration(path);

const shouldIndentBefore = createTypeChecker([
    ['-: ->', isFirst],
    ['-', isProgramPrevFunctionDeclaration],
    ['+', isPrev],
    ['+', isNext],
    ['+: parentPath -> BlockStatement'],
    ['+: parentPath.parentPath -> FunctionDeclaration'],
]);

const isBreaklineAfter = createTypeChecker([
    ['-: -> !', isNext],
    ['-', callWithNext(isExpressionStatement)],
    ['+', isInsideProgram],
]);

const isNewlineAfter = createTypeChecker([
    ['+', isNext],
    ['+: parentPath -> BlockStatement'],
    ['+: parentPath.parentPath -> FunctionDeclaration'],
]);

const maybeNewlineAfter = (path, {print}) => {
    if (!isNewlineAfter(path))
        return;
    
    if (isBreaklineAfter(path)) {
        print.breakline();
        return;
    }
    
    print.newline();
};

