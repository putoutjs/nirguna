import {types, operator} from 'putout';

const {
    compare,
    remove,
    insertAfter,
} = operator;

const {expressionStatement} = types;
const LOCAL = 'local(__a, __b)';

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const fix = (path) => {
    const {node, parentPath} = path;
    const expression = expressionStatement(node);
    const last = findLastLocal(path.parentPath);
    
    insertAfter(last, expression);
    remove(parentPath);
};

export const traverse = ({push}) => ({
    [LOCAL]: (path) => {
        const prev = path.parentPath.getPrevSibling();
        
        if (!prev.node)
            return;
        
        if (compare(prev, LOCAL))
            return;
        
        push(path);
    },
});

function findLastLocal(path) {
    do {
        path = path.getPrevSibling(path);
    } while (!compare(path, LOCAL));
    return path;
}
