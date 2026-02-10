import {types} from '@putout/babel';

const {
    isCallExpression,
    isMemberExpression,
} = types;

export const isInOut = (expression) => {
    if (!isCallExpression(expression))
        return false;
    
    const {callee} = expression.node;
    
    if (!isMemberExpression(callee))
        return false;
    
    const {object, property} = callee;
    
    if (object.name !== 'io')
        return false;
    
    return /^(in|out)$/.test(property.name);
};

export function printInOut(path, printer) {
    const {print} = printer;
    const callee = path.get('callee');
    const property = callee.get('property');
    
    print(property);
    print(' ');
    const [arg1, arg2] = path.get('arguments');
    
    print(arg1);
    print(', ');
    print(arg2);
}
