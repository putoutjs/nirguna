import {createTypeChecker} from '@putout/printer/type-checker';
import {isNext} from '#is';

const isParentNext = (path) => isNext(path.parentPath);

const EXPORT = '__nirguna_wasm_export';

export const isWastExport = createTypeChecker([
    ['-: -> !CallExpression'],
    ['+: node.callee.name', '=', EXPORT],
]);

export const printWasmExport = (path, printer) => {
    const {print, maybe} = printer;
    const [name, target, kind] = path.get('arguments');
    
    print('(');
    print('export');
    print.space();
    print(`"${name.node.value}"`);
    print.space();
    print('(');
    print(kind.node.value);
    print.space();
    print('$');
    print(target.node.name);
    print('))');
    
    maybe.print.newline(isParentNext(path));
};
