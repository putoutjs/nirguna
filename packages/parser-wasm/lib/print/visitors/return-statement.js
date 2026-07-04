export const ReturnStatement = (path, {indent, print}) => {
    indent();
    print('return');
    
    if (path.node.argument) {
        print.space();
        print('__argument');
    }
    
    print.newline();
};
