import {types} from '@putout/babel';

const {
    isWhileStatement,
    isBooleanLiteral,
} = types;

const isTrueWhile = (path) => {
    if (!isWhileStatement(path))
        return false;
    
    const test = path.get('test');
    
    return isBooleanLiteral(test) && test.node.value;
};

export const LabeledStatement = (path, printer) => {
    const {
        write,
        indent,
        traverse,
    } = printer;
    
    const {node} = path;
    const label = node.label.name;
    const body = path.get('body');
    
    const isLoop = isTrueWhile(body);
    const inner = isLoop ? body.get('body') : body;
    
    indent();
    write('(');
    
    write(isLoop ? 'loop' : 'block');
    write(' $');
    write(label);
    
    write.breakline();
    
    for (const element of inner.get('body')) {
        traverse(element);
    }
    
    write(')');
    write.newline();
};
