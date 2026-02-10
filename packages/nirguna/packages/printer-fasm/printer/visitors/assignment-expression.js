import {visitors} from '@putout/printer';
import {types} from '@putout/babel';

const {isMemberExpression} = types;

export const AssignmentExpression = (path, printer, semantics) => {
    const left = path.get('left');
    const right = path.get('right');
    
    if (isMemberExpression(left) && left.node.computed) {
        const {write, traverse} = printer;
        const object = path.get('left.object');
        const property = path.get('left.property');
        
        write('mov ');
        write('[');
        traverse(object);
        write(':');
        traverse(property);
        write(']');
        write(',');
        write.space();
        traverse(right);
        
        return;
    }
    
    if (isMemberExpression(right) && right.node.computed) {
        const {write, traverse} = printer;
        const object = path.get('right.object');
        const property = path.get('right.property');
        
        write('mov ');
        traverse(left);
        write(',');
        write.space();
        write('[');
        traverse(object);
        write(':');
        traverse(property);
        write(']');
        
        return;
    }
    
    return visitors.AssignmentExpression(path, printer, semantics);
};
