export const Program = (path, printer) => {
    const {
        traverse,
        write,
        indent,
    } = printer;
    
    const body = path.get('body');
    
    traverse(path.get('interpreter'));
    write('(');
    write('module');
    
    if (body.length) {
        indent.inc();
        write.breakline();
        body.forEach(traverse);
        indent.dec();
        write.newline();
    }
    
    write(')');
    write.endOfFile();
};
