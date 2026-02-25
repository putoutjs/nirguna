import {template} from 'putout';
import {TARGETS} from '#targets';

export const report = (path, {options}) => {
    const {target} = options;
    return `Insert target: '${target}'`;
};

export const fix = (path, {options}) => {
    const {target} = options;
    
    path.node.extra.target = target;
    const {code} = TARGETS[target];
    
    path.node.body.unshift(template.ast(code));
};

export const include = () => ['Program'];

export const filter = (path, {options}) => {
    const {target} = options;
    
    if (!target)
        return;
    
    if (path.node.extra.target)
        return;
    
    return TARGETS[target];
};
