import {types} from '@putout/babel';

const {isCallExpression} = types;

export const isWastMemory = (expression) => {
    if (!isCallExpression(expression))
        return;
    
    const {name} = expression.node.callee;
    
    return name === '__nirguna_wasm_memory';
};

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
