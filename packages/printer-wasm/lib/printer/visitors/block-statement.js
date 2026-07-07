const isFirstStatement = (path) => path.node.body[0];

export const BlockStatement = (path, printer) => {
    const {
        indent,
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
    indent();
};

