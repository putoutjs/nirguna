const parseArgs = (path) => {
    return path.get('arguments');
};

export function CallExpression(path, {print, maybe, traverse}) {
    const args = parseArgs(path);
    
    const callee = path.get('callee');
    
    traverse(callee);
    
    maybe.print.space(args.length);
    
    const n = args.length - 1;
    
    for (const [i, arg] of args.entries()) {
        print(arg);
        
        if (i < n)
            print(', ');
    }
}
