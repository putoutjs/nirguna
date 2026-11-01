import {
    operator,
    types,
} from 'putout';

const {getBinding} = operator;
const {isIdentifier} = types;

export const report = () => `The wasm backend cannot read a byte at an address yet`;

const isParameter = (path) => {
    const {object} = path.node;
    
    if (!isIdentifier(object))
        return false;
    
    const binding = getBinding(path, object.name);
    
    if (!binding)
        return false;
    
    return binding.kind === 'param';
};

export const fix = () => {};

export const traverse = ({push}) => ({
    MemberExpression(path) {
        if (!path.node.computed)
            return;
        
        if (!isParameter(path))
            return;
        
        push(path);
    },
});
