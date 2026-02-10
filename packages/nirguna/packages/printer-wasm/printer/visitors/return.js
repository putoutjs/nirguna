export const ReturnStatement = (path, printer) => {
    const {
        indent,
        print,
        maybe,
    } = printer;
    
    indent();
    print('(');
    print('return');
    maybe.print.space(path.node.argument);
    
    print('__argument');
    print(')');
    print.newline();
};
