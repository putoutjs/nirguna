import {createTypeChecker} from '@putout/printer/type-checker';

const checkName = (a) => a === 'elem';

export const isWastElem = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', checkName],
]);

export function printWasmElem(path, printer) {
    const {print} = printer;
    const [offset, ...funcs] = path.get('arguments');
    
    print('(elem ');
    print(offset);
    
    for (const func of funcs) {
        print.space();
        print('$');
        print(func.node.name);
    }
    
    print(')');
}
