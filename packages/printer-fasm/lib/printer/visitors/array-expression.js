export const ArrayExpression = {
    print(path, printer) {
        const {print, maybe} = printer;
        
        const multiline = false;
        
        const elements = path.get('elements');
        
        print('[');
        maybe.print.newline(multiline);
        
        for (const element of elements) {
            print(element);
        }
        
        print(']');
    },
};
