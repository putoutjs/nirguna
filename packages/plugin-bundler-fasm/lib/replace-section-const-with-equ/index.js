import {operator} from 'putout';

const {
    replaceWithMultiple,
    remove,
} = operator;

export const report = () => `Replace section 'const' with 'equ'`;

export const fix = ({label, list}) => {
    const nodes = [];
    
    for (const current of list.reverse()) {
        nodes.push(current.node);
        remove(current);
    }
    
    replaceWithMultiple(label, nodes);
};
export const traverse = ({store, pathStore, push}) => ({
    LabeledStatement(path) {
        const {node} = path;
        const {label, body} = node;
        
        const {name} = label;
        
        if (name === 'section' && body.expression.value === 'const')
            store('label', path);
    },
    '__a.equ = __b': pathStore,
    VariableDeclaration(path) {
        if (path.node.kind !== 'const')
            return;
        
        pathStore(path);
    },
    'Program': {
        exit(path) {
            const [label] = store();
            const list = pathStore();
            
            if (!label)
                return;
            
            push({
                path,
                label,
                list,
            });
        },
    },
});
