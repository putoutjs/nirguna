import {types} from 'putout';
import {findShape} from './shapes.js';

const not = (fn) => (...a) => !fn(...a);

const {
    directive,
    directiveLiteral,
} = types;

const FACTS = /^reg /;

export const isFacts = (a) => FACTS.test(a.value.value);

const isNotFacts = not(isFacts);

export const hasFacts = (fn) => {
    for (const item of fn.node.body.directives) {
        if (isFacts(item))
            return true;
    }
    
    return false;
};

export const getFacts = (fn) => fn.node.body.directives.find(isFacts).value.value;

export const addFacts = (fn, text) => {
    fn.node.body.directives.push(directive(directiveLiteral(text)));
};

export const removeFacts = (fn) => {
    fn.node.body.directives = fn.node.body.directives.filter(isNotFacts);
};

export const createFacts = (shape, vars) => {
    const values = [];
    
    for (const [name, register] of shape.values) {
        values.push(`${vars[name].name}=${register}`);
    }
    
    return `reg ${shape.name} ${values.join(' ')}`;
};

export const parseFacts = (text) => {
    const [, name, ...values] = text.split(' ');
    const shape = findShape(name);
    
    if (!shape)
        return;
    
    const names = [];
    
    for (const a of values) {
        names.push(a.split('=')[0]);
    }
    
    return {
        shape,
        names: names.slice(0, shape.parameters.length),
    };
};
