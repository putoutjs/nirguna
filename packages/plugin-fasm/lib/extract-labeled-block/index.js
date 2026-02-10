import {types, operator} from 'putout';

const {getTemplateValues} = operator;

const {
    isProgram,
    isBlockStatement,
    isLabeledStatement,
} = types;

export const report = ({path}) => {
    const {name} = path.node.label;
    
    return `Extract 'labeled' block: '${name}'`;
};

export const fix = ({path, first, other}) => {
    path.node.body = first;
    
    const index = path.parentPath.node.body.indexOf(path.node);
    const {body} = path.parentPath.node;
    
    body.splice(index + 1, 0, ...other);
};
export const traverse = ({push}) => ({
    '__a: __b: {__body}': (path) => {
        const {parentPath} = path;
        
        if (isProgram(parentPath))
            return;
        
        if (isLabeledStatement(parentPath))
            return;
        
        if (isLabeledStatement(path.node.body))
            return;
        
        const {__body} = getTemplateValues(path, '__a: __b: {__body}');
        
        const [first, ...other] = __body.body;
        
        if (!isBlockStatement(first))
            push({
                path,
                first,
                other,
            });
    },
    '__a: {__body}': (path) => {
        const {parentPath} = path;
        
        if (isLabeledStatement(parentPath))
            return;
        
        if (isProgram(parentPath))
            return;
        
        const {__body} = getTemplateValues(path, '__a: {__body}');
        const [first, ...other] = __body.body;
        
        if (!isBlockStatement(first))
            push({
                path,
                first,
                other,
            });
    },
});
