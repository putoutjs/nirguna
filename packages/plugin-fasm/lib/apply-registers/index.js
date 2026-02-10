import {types} from 'putout';

const {isArrayExpression} = types;

function getType(arg) {
    return arg.__nirguna_type || 'i16';
}

export const report = (path) => {
    const arg1 = path.get('left.0');
    const arg2 = path.get('right.0');
    const type1 = getType(arg1);
    const type2 = getType(arg2);
    
    if (type1 !== type2)
        return `Types mismatch: '${arg1}:${type1} = ${arg2}:${type2}'`;
    
    return `Use registers to address memory`;
};

export const match = () => ({
    '[__a] = [__b]': ({__a, __b}) => {
        return !isArrayExpression(__a) && !isArrayExpression(__b);
    },
});

export const replace = () => ({
    '[__a] = [__b]': (vars, path) => {
        const arg1 = path.get('left.0');
        const arg2 = path.get('right.0');
        const type1 = getType(arg1);
        const type2 = getType(arg2);
        
        if (type1 !== type2)
            return path;
        
        const reg = type1 === 'i8' ? 'al' : 'ax';
        
        return `{
            mov(${reg}, [__b]);
            mov([__a], ${reg});
        }`;
    },
});
