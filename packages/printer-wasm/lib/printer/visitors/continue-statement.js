export const ContinueStatement = (path, {write, indent}) => {
    const {label} = path.node;
    
    indent();
    write('(');
    write('br');
    write(' $');
    write(label.name);
    write(')');
    write.newline();
};
