import {operator} from 'putout';

const {
    replaceWithMultiple,
    remove,
} = operator;

export const report = () => `Replace section 'code' with functions`;

export const fix = ({label, fns}) => {
    const nodes = [];
    
    for (const fn of fns.reverse()) {
        nodes.push(fn.node);
        remove(fn);
    }
    
    replaceWithMultiple(label, nodes);
};
export const traverse = ({store, pathStore, push, options}) => ({
    LabeledStatement(path) {
        const {node} = path;
        const {label, body} = node;
        
        const {name} = label;
        
        if (name === 'section' && body.expression.value === 'code')
            store('label', path);
    },
    'FunctionDeclaration': (path) => {
        if (path.node.id.name === 'start')
            return;
        
        pathStore(path);
    },
    'const __a = (__args) => __body': pathStore,
    'Program': {
        exit(path) {
            const [label] = store();
            const {functions = []} = options;
            const fns = [
                ...pathStore(),
                ...functions,
            ];
            
            if (!label)
                return;
            
            if (!fns.length)
                return;
            
            push({
                path,
                label,
                fns,
            });
        },
    },
});
