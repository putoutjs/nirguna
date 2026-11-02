import {SHAPES} from '../shapes.js';
import {
    addFacts,
    createFacts,
    hasFacts,
} from '../facts.js';

export const report = () => `Analyze: registers`;

const hasParameter = (args, name) => {
    for (const arg of args) {
        if (arg.name === name)
            return true;
    }
    
    return false;
};

const hasParameters = (shape, vars) => {
    if (shape.registerParameters && vars.__args.length !== shape.parameters.length)
        return false;
    
    for (const placeholder of shape.parameters) {
        if (!hasParameter(vars.__args, vars[placeholder].name))
            return false;
    }
    
    return true;
};

const isKnown = (shape, vars, path) => hasParameters(shape, vars) && !hasFacts(path);

const apply = (shape, vars, path) => {
    addFacts(path, createFacts(shape, vars));
    return path.node;
};

const createRules = (create) => {
    const rules = {};
    
    for (const shape of SHAPES) {
        for (const template of shape.templates) {
            rules[template] = create.bind(null, shape);
        }
    }
    
    return rules;
};

export const match = () => createRules(isKnown);

export const replace = () => createRules(apply);
