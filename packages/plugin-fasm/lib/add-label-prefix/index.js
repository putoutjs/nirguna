import {types} from 'putout';

const {isMemberExpression} = types;
const PREFIX = '__nirguna_';

export const report = ({name, newName}) => `Add prefix to label: '${name}' -> '${newName}'`;

export const fix = ({newName, path, ids}) => {
    path.node.label.name = newName;
    
    for (const {node} of ids) {
        node.name = newName;
    }
};

export const traverse = ({push}) => ({
    LabeledStatement(path) {
        const {name} = path.node.label;
        
        if (name.startsWith(PREFIX))
            return;
        
        const newName = `${PREFIX}${name}`;
        const ids = getIds(path, name);
        
        push({
            path,
            ids,
            name,
            newName,
        });
    },
});

function getIds(path, name) {
    const ids = [];
    const {path: programPath} = path.scope.getProgramParent();
    
    programPath.traverse({
        Identifier(path) {
            if (isMemberExpression(path.parentPath))
                return;
            
            if (name !== path.node.name)
                return;
            
            const calleePath = path.parentPath.get('callee');
            
            if (calleePath === path)
                return;
            
            ids.push(path);
        },
    });
    
    return ids;
}
