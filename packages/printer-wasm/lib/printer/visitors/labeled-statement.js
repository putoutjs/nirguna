import {isInsideLabel} from '@putout/printer/is';

export const LabeledStatement = (path, {print, maybe}) => {
    maybe.indent(!isInsideLabel(path));
    print('(block $');
    print('__label');
    print.space();
    print('__body');
    print(')');
    print.newline();
};
