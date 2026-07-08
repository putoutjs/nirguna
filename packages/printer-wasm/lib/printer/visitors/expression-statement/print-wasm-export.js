import {createTypeChecker} from '@putout/printer/type-checker';

const checkName = (a) => a === '__nirguna_wasm_export';

export const isWastExport = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', checkName],
]);

export const printWasmExport = (path, printer) => {
    const {print} = printer;
    const [name, target, kind] = path.get('arguments');
    
    print('(export "');
    print(name.node.value);
    print('" (');
    print(kind.node.value);
    print(' $');
    print(target.node.name);
    print('))');
};
