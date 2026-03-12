import {
    template,
    types,
    operator,
} from 'putout';

const {
    blockStatement,
    isArrayExpression,
    isVariableDeclarator,
    isIdentifier,
} = types;

const {remove} = operator;

const createIf = template('if (__e === __f) __c', {
    placeholderPattern: /__[a-z]/,
});

export const report = () => `Use 'if condition' instead of 'includes'`;

export const match = () => ({
    'if (__a.includes(__b)) __c': ({__a, __b}, path) => {
        if (!isIdentifier(__a))
            return false;
        
        if (!isIdentifier(__b))
            return false;
        
        const binding = path.scope.getAllBindings()[__a.name];
        
        if (!binding)
            return false;
        
        const arrayPath = binding.path;
        
        if (!isVariableDeclarator(arrayPath))
            return false;
        
        const {init} = arrayPath.node;
        
        return isArrayExpression(init);
    },
});

export const replace = () => ({
    'if (__a.includes(__b)) __c': ({__a, __b, __c}, path) => {
        const binding = path.scope.getAllBindings()[__a.name];
        const arrayPath = binding.path;
        
        const {init} = arrayPath.node;
        
        const {elements} = init;
        const nodes = [];
        
        for (const element of elements) {
            nodes.push(createIf({
                __e: __b,
                __f: element,
                __c,
            }));
        }
        
        remove(arrayPath);
        
        return blockStatement(nodes);
    },
});
