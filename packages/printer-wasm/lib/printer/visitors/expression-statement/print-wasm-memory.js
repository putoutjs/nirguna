import {createTypeChecker} from '@putout/printer/type-checker';

const checkName = (a) => a === '__nirguna_wasm_memory';

export const isWastMemory = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', checkName],
]);

export function printWasmMemory(path, printer) {
    const {print} = printer;
    const [first, second] = path.get('arguments');
    
    print('(memory ');
    
    if (!second) {
        print(first);
    } else {
        print('(export ');
        print(first);
        print(')');
        print.space();
        print(second);
    }
    
    print(')');
}
