import {
    template,
    operator,
    types,
} from 'putout';

const {insertBefore} = operator;
const {
    expressionStatement,
    isObjectExpression,
    isExpressionStatement,
} = types;

export const report = () => `Use 'call()' operations instead of 'await'`;

const createMov = template('mov(__key, __value)', {
    placeholderPattern: /__[a-z]/,
});

export const filter = (path) => {
    return isExpressionStatement(path.parentPath);
};

export const replace = () => ({
    'await __a(__b, __c)': `{
        push(__b);
        push(__c);
        call(__a);
    }`,
    'await __a()': 'call(__a)',
    'await __a(__b)': ({__b}, path) => {
        if (!isObjectExpression(__b))
            return `{
                push(__b);
                call(__a);
            }`;
        
        for (const {key, value} of __b.properties) {
            const mov = expressionStatement(createMov({
                __key: key,
                __value: value,
            }));
            
            insertBefore(path, mov);
        }
        
        const {argument} = path.node;
        
        argument.arguments = [];
        
        return 'call(__a)';
    },
});
