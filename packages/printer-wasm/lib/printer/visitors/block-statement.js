const isFirstStatement = (path) => path.node.body[0];
const isFirstDirective = (path) => path.node.directives?.[0];

export const BlockStatement = {
    print(path, printer) {
        const {
            indent,
            maybe,
            write,
            traverse,
        } = printer;
        
        const body = path.get('body');
        
        if (path.parentPath.isBlockStatement())
            indent();
        
        indent.inc();
        
        if (isFirstStatement(path) || isFirstDirective(path))
            write.newline();
        
        for (const element of body) {
            traverse(element);
        }
        
        indent.dec();
        maybe.indent(body.length);
        
        if (path.parentPath.isObjectMethod())
            write(',');
    },
};
