import {
    isInsideBlock,
    isNextParent,
    isInsideIf,
    isInsideLabel,
} from '@putout/printer/is';

export const BreakStatement = {
    split(path, {print}) {
        print.newline();
    },
    print(path, {print, maybe}) {
        maybe.indent(!isInsideLabel(path));
        print('(br $');
        print('__label');
        print(')');
    },
    afterSatisfy: () => [
        isInsideBlock,
        isNextParent,
        isInsideIf,
    ],
};
