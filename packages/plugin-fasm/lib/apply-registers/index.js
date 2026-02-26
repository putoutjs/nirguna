import {types} from 'putout';

const {isArrayExpression} = types;

export const report = () => {
    return `Use registers to address memory`;
};

export const match = () => ({
    '[__a] = [__b]': ({__a, __b}) => {
        return !isArrayExpression(__a) && !isArrayExpression(__b);
    },
});

export const replace = () => ({
    '[__a] = [__b]': () => {
        const reg = 'ax';
        
        return `{
            mov(${reg}, [__b]);
            mov([__a], ${reg});
        }`;
    },
});
