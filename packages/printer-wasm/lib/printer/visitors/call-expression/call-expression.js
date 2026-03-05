import {types} from '@putout/babel';
import {isWasmType} from './is-wasm-type.js';

const {
    isIdentifier,
    isCallExpression,
} = types;

export function CallExpression(path, {indent, print, maybe, traverse}) {
    const args = path.get('arguments');
    const n = args.length - 1;
    const isParentCall = isCallExpression(path.parentPath);
    const callee = path.get('callee');
    
    print('(');
    
    traverse(callee);
    
    maybe.print.space(args.length);
    maybe.indent.inc(isParentCall);
    
    for (const [i, arg] of args.entries()) {
        if (isIdentifier(arg) && !isWasmType(arg.node.name))
            print('$');
        
        print(arg);
        
        if (i < n)
            print(' ');
    }
    
    if (isParentCall) {
        indent.dec();
        maybe.print.breakline(n);
    }
    
    print(')');
}
