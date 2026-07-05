export const ExportNamedDeclaration = (path, printer) => {
    const {print, write} = printer;
    const {leadingComments} = path.node;
    
    if (leadingComments)
        for (const comment of leadingComments) {
            write(';; ');
            write(comment.value.trimStart());
            write.breakline();
        }
    
    print('__declaration');
};
