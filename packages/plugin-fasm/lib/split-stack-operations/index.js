import {types, operator} from 'putout';

const {
    expressionStatement,
    labeledStatement,
    blockStatement,
    isLabeledStatement,
    callExpression,
} = types;

const {
    replaceWith,
    replaceWithMultiple,
} = operator;

export const report = ({node}) => {
    const {callee} = node;
    const {name} = callee;
    
    return `Split '${name}(__array)' to couple calls`;
};

export const fix = (path) => {
    const {callee} = path.node;
    const [first] = path.get('arguments');
    const {elements} = first.node;
    const nodes = [];
    
    for (const element of elements) {
        nodes.push(callExpression(callee, [element]));
    }
    
    const {parentPath} = path.parentPath;
    
    if (isLabeledStatement(parentPath)) {
        const {label} = parentPath.node;
        const expressions = nodes.map(expressionStatement);
        
        replaceWith(parentPath, labeledStatement(label, blockStatement(expressions)));
        
        return;
    }
    
    replaceWithMultiple(path, nodes);
};

export const include = () => [
    'push(__array)',
    'pop(__array)',
];
