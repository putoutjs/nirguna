import {types, operator} from 'putout';
import {isRegister} from '@nirguna/operator-fasm/regs';

const {traverse} = operator;

const {
    isMemberExpression,
    isCallExpression,
    isArrayExpression,
    isBinaryExpression,
} = types;

export const report = (path) => {
    return `Use 'mov()' instead of '=' in '${path}'`;
};

export const match = () => ({
    '__a = __b': ({__a, __b}) => {
        if (isArrayExpression(__a) && isArrayExpression(__b))
            return false;
        
        if (isMemberExpression(__a))
            return false;
        
        if (isMemberExpression(__b))
            return false;
        
        if (isBinaryExpression(__b)) {
            let is = false;
            
            traverse(__b, {
                Identifier: (path) => {
                    const {name} = path.node;
                    
                    if (isRegister(name)) {
                        is = true;
                        path.stop();
                    }
                },
            });
            
            if (is)
                return false;
        }
        
        return !isCallExpression(__b);
    },
});

export const replace = () => ({
    '__a = __b': 'mov(__a, __b)',
});

