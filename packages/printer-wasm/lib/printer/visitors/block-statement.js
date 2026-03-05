const isFirstStatement = (path) => path.node.body[0];

export const BlockStatement = {
    print(path, printer) {
        const {
            indent,
            maybe,
            write,
            traverse,
        } = printer;
        
        const body = path.get('body');
        
        indent.inc();
        
        if (isFirstStatement(path))
            write.newline();
        
        for (const element of body) {
            traverse(element);
        }
        
        indent.dec();
        maybe.indent(body.length);
    },
};
