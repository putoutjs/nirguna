import {types} from '@putout/babel';
import {isWasmType} from './is-wasm-type.js';

const {isIdentifier} = types;
const {isArray} = Array;

const parseArgs = (path) => {
    const argsPath = path.get('arguments');
    
    if (!isArray(argsPath))
        return [];
    
    return argsPath;
};

export function CallExpression(path, {indent, print, maybe, traverse}) {
    const args = parseArgs(path);
    const n = args.length - 1;
    const isParentCall = path.parentPath.isCallExpression();
    const callee = path.get('callee');
    
    print('(');
    
    traverse(callee);
    
    maybe.print.space(args.length);
    maybe.indent.inc(isParentCall);
    
    for (const [i, arg] of args.entries()) {
        const isObject = arg.isObjectExpression();
        
        if (isParentCall && !isObject && n)
            print.breakline();
        
        if (isIdentifier(arg) && !isWasmType(arg.node.name))
            print('$');
        
        print(arg);
        
        if (isParentCall && n)
            continue;
        
        if (i < n)
            print(' ');
    }
    
    if (isParentCall) {
        indent.dec();
        maybe.print.breakline(n);
    }
    
    print(')');
}
