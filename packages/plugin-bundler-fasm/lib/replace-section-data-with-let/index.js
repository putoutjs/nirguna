import {operator, types} from 'putout';

const {isProgram} = types;

const {
    replaceWithMultiple,
    remove,
} = operator;

export const report = () => `Replace section 'data' with 'let'`;

export const fix = ({label, list}) => {
    const nodes = [];
    
    for (const current of list.reverse()) {
        nodes.push(current.node);
        remove(current);
    }
    
    replaceWithMultiple(label, nodes);
};
export const traverse = ({store, pathStore, push, options}) => ({
    LabeledStatement(path) {
        const {label, body} = path.node;
        const {name} = label;
        
        if (name === 'section' && body.expression.value === 'data')
            store('label', path);
    },
    VariableDeclaration: (path) => {
        if (path.node.kind !== 'let')
            return;
        
        if (isProgram(path.parentPath))
            pathStore(path);
    },
    Program: {
        exit(path) {
            const {variables = []} = options;
            const [label] = store();
            const list = [
                ...pathStore(),
                ...variables,
            ];
            
            if (!label)
                return;
            
            if (!list.length)
                return;
            
            push({
                path,
                label,
                list,
            });
        },
    },
});
