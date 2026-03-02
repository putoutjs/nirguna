import {types} from '@putout/babel';

const {
    isCallExpression,
    isMemberExpression,
} = types;

export const isJmpFar = (expression) => {
    if (!isCallExpression(expression))
        return false;
    
    const {callee} = expression.node;
    
    if (!isMemberExpression(callee))
        return false;
    
    const {object, property} = callee;
    
    return object.name === 'jmp' && property.name === 'far';
};

export function printJmpFar(path, printer) {
    const {print} = printer;
    const callee = path.get('callee');
    const [first] = path.node.arguments;
    
    print(callee);
    print(' ');
    print(first.value);
}
