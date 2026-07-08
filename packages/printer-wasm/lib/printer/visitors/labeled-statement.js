import {types} from '@putout/babel';
import {isInsideLabel} from '#is';

const {isDoWhileStatement} = types;

export const LabeledStatement = (path, {print, maybe}) => {
    const {body} = path.node;
    
    if (isDoWhileStatement(body)) {
        print('__body');
        return;
    }
    
    maybe.indent(!isInsideLabel(path));
    
    print('(block $');
    print('__label');
    print('__body');
    print.indent();
    print(')');
    print.newline();
};

