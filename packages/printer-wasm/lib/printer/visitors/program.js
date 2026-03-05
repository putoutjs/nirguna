export const Program = (path, printer) => {
    const {
        traverse,
        write,
        indent,
    } = printer;
    
    traverse(path.get('interpreter'));
    write('(');
    write('module');
    indent.inc();
    write.breakline();
    
    path.get('body').forEach(traverse);
    indent.dec();
    write.newline();
    write(')');
    
    write.endOfFile();
};
