import {exists} from '@putout/printer/is';

export const LabeledStatement = (path, {print, maybe}) => {
    const prev = path.getPrevSibling();
    const next = path.getNextSibling();
    
    maybe.print.breakline(exists(prev));
    
    print('__label');
    print(':');
    print.breakline();
    print('__body');
    maybe.print.breakline(exists(next));
};
