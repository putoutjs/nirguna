export const WhileStatement = (path, {print}) => {
    print('while');
    print.space();
    print('(');
    print('__test');
    print(')');
    
    if (path.node.body.body) {
        print.space();
        print('__body');
        
        return;
    }
    
    print.newline();
    print('__body');
};
