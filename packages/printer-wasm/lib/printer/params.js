const parseParams = (path) => path.get('params');

export const printParams = (path, printer, semantics, customization = {}) => {
    const {print, traverse} = printer;
    
    const {
        params = parseParams(path),
        braceOpen = '(',
        braceClose = ')',
        printSpace = print.space,
    } = customization;
    
    const n = params.length - 1;
    
    for (let i = 0; i <= n; i++) {
        printBraceOpen({
            print,
            braceOpen,
        });
        
        const isLast = i === n;
        const current = params[i];
        
        print('$');
        traverse(current);
        
        printBraceClose({
            print,
            braceClose,
        });
        
        if (!isLast)
            printSpace();
    }
};

const printBraceOpen = ({print, braceOpen}) => print(braceOpen);

function printBraceClose({print, braceClose}) {
    print(braceClose);
}
