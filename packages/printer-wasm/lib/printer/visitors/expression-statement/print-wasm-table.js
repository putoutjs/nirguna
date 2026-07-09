import {createTypeChecker} from '@putout/printer/type-checker';

const checkName = (a) => a === 'table';

export const isWastTable = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', checkName],
]);

export function printWasmTable(path, printer) {
    const {print} = printer;
    const [min, max, elementType] = path.get('arguments');
    
    print('(table ');
    print(min);
    
    if (!max.isNullLiteral()) {
        print.space();
        print(max);
    }
    
    print.space();
    print(elementType.node.value);
    print(')');
}
