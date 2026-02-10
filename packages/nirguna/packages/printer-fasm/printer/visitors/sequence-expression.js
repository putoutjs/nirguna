import {types} from '@putout/babel';

const {isMemberExpression} = types;

export const SequenceExpression = (path, {traverse, maybe, write}) => {
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    
    for (const [i, expression] of expressions.entries()) {
        traverse(expression);
        
        if (isMemberExpression(expression) || n > 1 && i < n)
            write(',');
        
        maybe.write(i < n, ' ');
    }
};
