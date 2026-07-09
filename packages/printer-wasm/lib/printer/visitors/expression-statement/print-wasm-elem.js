import {createTypeChecker} from '@putout/printer/type-checker';
import {types} from '@putout/babel';
import {isNext} from '#is';

const {isFunction} = types;

const isParentNext = (path) => isNext(path.parentPath);
const isNextFn = (path) => {
    const next = path.parentPath.getNextSibling();
    return isFunction(next);
};

const checkName = (a) => a === 'elem';

export const isWastElem = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', checkName],
]);

export function printWasmElem(path, printer) {
    const {print, indent} = printer;
    const [offset, ...funcs] = path.get('arguments');
    
    print('(elem ');
    print(offset);
    
    for (const func of funcs) {
        print.space();
        print('$');
        print(func.node.name);
    }
    
    print(')');
    
    if (isParentNext(path))
        print.newline();
    
    if (isNextFn(path))
        indent();
}

