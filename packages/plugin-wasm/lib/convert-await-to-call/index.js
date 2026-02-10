import {
    template,
    operator,
    types,
} from 'putout';

const {replaceWith, extract} = operator;
const {identifier, callExpression} = types;

const createLocalGet = template('local.get(%%NAME%%)');

export const report = () => `Use 'if condition' instead of 'ternary expression'`;

export const replace = () => ({
    'await __a(__args)': ({__a}, path) => {
        const args = path.get('argument.arguments');
        const variables = [];
        
        for (const arg of args) {
            const name = extract(arg);
            const current = createLocalGet({
                NAME: String(name),
            });
            
            variables.push(current);
        }
        
        const call = callExpression(identifier('call'), [
            identifier(String(__a.name)),
            ...variables,
        ]);
        
        replaceWith(path, call);
        
        return path;
    },
});
