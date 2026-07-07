import {isLast} from '@putout/printer/is';

const notLast = (path) => !isLast(path);

export const DoWhileStatement = {
    print(path, {print, indent}) {
        const label = path.parentPath.get('label');
        indent();
        print('(');
        print('loop');
        print(' ');
        print(label);
        
        print('__body');
        print.breakline();
        print(')');
    },
    afterSatisfy: () => [
        notLast,
    ],
    after(path, {print}) {
        print.newline();
    },
};
